import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { getDataFromToken } from '@/lib/auth';
import Notification from '@/models/Notification';

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const currentUser = getDataFromToken(request);
        if (!currentUser || currentUser.role !== 'admin') {
            return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
        }

        const { id } = await params;
        const reqBody = await request.json();
        const { status } = reqBody; // 'active' or 'rejected' or 'suspended'

        if (!['active', 'rejected', 'suspended'].includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        await dbConnect();
        const user = await User.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        ).select('-password');

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Send notification to user
        await Notification.create({
            recipient: user._id,
            type: 'registration_approved', // or rejected/suspended, generic type for now
            message: `Your account status has been updated to: ${status}`,
            read: false,
        });

        return NextResponse.json({
            message: 'User status updated successfully',
            data: user,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
