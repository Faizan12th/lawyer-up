import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import VerificationToken from '@/models/VerificationToken';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
        }

        const verificationToken = await VerificationToken.findOne({ token });

        if (!verificationToken) {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
        }

        if (verificationToken.expiresAt < new Date()) {
            return NextResponse.json({ error: 'Token expired' }, { status: 400 });
        }

        const user = await User.findById(verificationToken.userId);
        if (!user) {
            console.log('User not found for token:', verificationToken);
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        console.log('Verifying user:', user._id);

        const savedUser = await User.findByIdAndUpdate(
            user._id,
            { isEmailVerified: true },
            { new: true }
        );

        console.log('User updated:', savedUser);

        await VerificationToken.findByIdAndDelete(verificationToken._id);

        return NextResponse.json({
            message: 'Email verified successfully',
            success: true,
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
