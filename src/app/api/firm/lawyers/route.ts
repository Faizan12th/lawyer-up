import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Case from '@/models/Case';
import Appointment from '@/models/Appointment';
import { getDataFromToken } from '@/lib/auth';
import bcryptjs from 'bcryptjs';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const currentUser = getDataFromToken(request);

        if (!currentUser || currentUser.role !== 'law_firm') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const lawyers = await User.find({ lawFirm: currentUser.userId, role: 'lawyer' });

        // Aggregate stats for each lawyer
        const lawyersWithStats = await Promise.all(lawyers.map(async (lawyer) => {
            const activeCases = await Case.countDocuments({ lawyer: lawyer._id, status: 'active' });
            const completedCases = await Case.countDocuments({ lawyer: lawyer._id, status: 'closed' });

            // Calculate average rating from reviews (if we had a Review model linked to lawyers directly, 
            // but currently reviews are linked to appointments. Let's approximate or fetch from Reviews)
            // For now, we'll return a placeholder or 0 if no reviews found.
            // Ideally: const reviews = await Review.find({ lawyer: lawyer._id });
            // const avgRating = ...

            return {
                id: lawyer._id,
                name: lawyer.name,
                email: lawyer.email,
                specialization: 'General', // Placeholder, needs to be in User model or Profile
                status: lawyer.status === 'active' ? 'Active' : 'Inactive',
                assignedCases: activeCases,
                completed: completedCases,
                rating: 0, // Placeholder
                image: lawyer.image
            };
        }));

        return NextResponse.json({
            success: true,
            data: lawyersWithStats
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const currentUser = getDataFromToken(request);

        if (!currentUser || currentUser.role !== 'law_firm') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, email, password, specialization } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newLawyer = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'lawyer',
            lawFirm: currentUser.userId,
            status: 'active',
            // specialization would go here if we added it to User model
        });

        return NextResponse.json({
            success: true,
            message: 'Lawyer added successfully',
            data: newLawyer
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
