import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { getDataFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const currentUser = getDataFromToken(request);
        if (!currentUser || currentUser.role !== 'admin') {
            return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
        }

        await dbConnect();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        const query: any = {};
        if (status) {
            query.status = status;
        }
        // Filter for lawyers and firms if looking for pending registrations
        if (status === 'pending') {
            query.role = { $in: ['lawyer', 'law_firm'] };
        }

        const users = await User.find(query).select('-password');

        return NextResponse.json({
            message: 'Users fetched successfully',
            data: users,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
