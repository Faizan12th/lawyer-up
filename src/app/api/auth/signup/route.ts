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

        // Generate verification token
        const crypto = require('crypto');
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const VerificationToken = require('@/models/VerificationToken').default;
        const { sendVerificationEmail } = require('@/lib/mail');

        await new VerificationToken({
            userId: savedUser._id,
            token: verificationToken,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        }).save();

        // Send verification email
        await sendVerificationEmail(savedUser.email, verificationToken);

        return NextResponse.json({
            message: 'User created successfully. Please verify your email.',
            success: true,
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                role: savedUser.role,
                status: savedUser.status,
            },
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
