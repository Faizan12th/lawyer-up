import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Notification from '@/models/Notification';
import { getDataFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const currentUser = getDataFromToken(request);
        if (!currentUser) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
        }

        await dbConnect();

        const notifications = await Notification.find({ recipient: currentUser.userId })
            .sort({ createdAt: -1 })
            .limit(20);

        return NextResponse.json({
            message: 'Notifications fetched successfully',
            data: notifications,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const currentUser = getDataFromToken(request);
        if (!currentUser) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
        }

        await dbConnect();

        // Mark all as read for now, or specific one if ID provided
        const reqBody = await request.json();
        const { id } = reqBody;

        if (id) {
            await Notification.findByIdAndUpdate(id, { read: true });
        } else {
            await Notification.updateMany(
                { recipient: currentUser.userId, read: false },
                { read: true }
            );
        }

        return NextResponse.json({
            message: 'Notifications marked as read',
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
