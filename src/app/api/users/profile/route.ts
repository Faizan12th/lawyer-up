import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Profile from '@/models/Profile';
import User from '@/models/User';
import { getDataFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const currentUser = getDataFromToken(request);
        if (!currentUser) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
        }

        await dbConnect();
        const profile = await Profile.findOne({ user: currentUser.userId });

        return NextResponse.json({
            message: 'Profile fetched successfully',
            data: profile,
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

        const reqBody = await request.json();
        await dbConnect();

        // Update User model if name/image changed
        if (reqBody.name || reqBody.image) {
            await User.findByIdAndUpdate(currentUser.userId, {
                name: reqBody.name,
                image: reqBody.image,
            });
        }

        // Update or Create Profile
        const profile = await Profile.findOneAndUpdate(
            { user: currentUser.userId },
            reqBody,
            { new: true, upsert: true }
        );

        return NextResponse.json({
            message: 'Profile updated successfully',
            data: profile,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
