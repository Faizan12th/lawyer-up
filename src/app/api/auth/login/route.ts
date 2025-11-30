import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcryptjs from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if user exists
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return NextResponse.json(
                { error: 'User does not exist' },
                { status: 400 }
            );
        }



        // Check if email is verified
        if (!user.isEmailVerified) {
            return NextResponse.json(
                { error: 'Please verify your email before logging in' },
                { status: 400 }
            );
        }

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password!);
        if (!validPassword) {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 400 }
            );
        }

        // Create token
        const token = signToken({ userId: user._id.toString(), role: user.role });

        const response = NextResponse.json({
            message: 'Login successful',
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
            },
        });

        response.cookies.set('token', token, {
            httpOnly: true,
            path: '/',
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
