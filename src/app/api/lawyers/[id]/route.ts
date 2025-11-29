import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Profile from '@/models/Profile';
import Review from '@/models/Review';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();

        const user = await User.findById(id).select('-password');
        if (!user) {
            return NextResponse.json({ error: 'Lawyer not found' }, { status: 404 });
        }

        const profile = await Profile.findOne({ user: id });
        const reviews = await Review.find({ lawyer: id }).populate('client', 'name image');

        return NextResponse.json({
            message: 'Lawyer details fetched successfully',
            data: {
                user,
                profile,
                reviews,
            },
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
