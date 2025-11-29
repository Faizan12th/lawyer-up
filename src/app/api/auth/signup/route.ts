import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcryptjs from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const { name, email, password, role } = reqBody;

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create new user
        // If role is lawyer or law_firm, status is pending, else active
        const status = (role === 'lawyer' || role === 'law_firm') ? 'pending' : 'active';

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'client',
            status,
        });

        const savedUser = await newUser.save();

        // Create token
        const token = signToken({ userId: savedUser._id.toString(), role: savedUser.role });

        const response = NextResponse.json({
            message: 'User created successfully',
            success: true,
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                role: savedUser.role,
                status: savedUser.status,
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
