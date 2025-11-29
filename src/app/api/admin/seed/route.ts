import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const adminEmail = 'admin@lawyerup.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            return NextResponse.json({
                message: 'Admin user already exists',
                email: adminEmail,
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const newAdmin = new User({
            name: 'Admin User',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
            status: 'active',
        });

        await newAdmin.save();

        return NextResponse.json({
            message: 'Admin user created successfully',
            email: adminEmail,
            password: 'admin123',
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
