import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Review from '@/models/Review';
import { getDataFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const currentUser = getDataFromToken(request);
        if (!currentUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        let lawyerId = searchParams.get('lawyerId');

        // If not admin, default to current user if lawyer, or require lawyerId
        if (currentUser.role !== 'admin') {
            lawyerId = lawyerId || (currentUser.role === 'lawyer' ? currentUser.userId : null);
            if (!lawyerId) {
                return NextResponse.json({ error: 'Lawyer ID required' }, { status: 400 });
            }
        }

        // Build query
        const query: any = {};
        if (lawyerId) {
            query.lawyer = lawyerId;
        }
        // If admin and no lawyerId, query remains empty -> fetch all

        const reviews = await Review.find(query)
            .populate('client', 'name image')
            .populate('lawyer', 'name') // Also populate lawyer name for admin view
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data: reviews });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const currentUser = getDataFromToken(request);
        if (!currentUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { lawyerId, rating, comment, appointmentId } = body;

        if (!lawyerId || !rating || !comment || !appointmentId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const review = await Review.create({
            lawyer: lawyerId,
            client: currentUser.userId,
            appointment: appointmentId,
            rating,
            comment,
        });

        return NextResponse.json({ success: true, data: review }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
