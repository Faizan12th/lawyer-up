import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Case from '@/models/Case';
import { getDataFromToken } from '@/lib/auth';
import Notification from '@/models/Notification';

export async function GET(request: NextRequest) {
    try {
        const currentUser = getDataFromToken(request);
        if (!currentUser) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
        }

        await dbConnect();

        let query: any = {};
        if (currentUser.role === 'client') {
            query.client = currentUser.userId;
        } else if (currentUser.role === 'lawyer' || currentUser.role === 'law_firm') {
            query.lawyer = currentUser.userId;
        }

        const cases = await Case.find(query)
            .populate('client', 'name image')
            .populate('lawyer', 'name image')
            .sort({ updatedAt: -1 });

        return NextResponse.json({
            message: 'Cases fetched successfully',
            data: cases,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const currentUser = getDataFromToken(request);
        if (!currentUser || (currentUser.role !== 'lawyer' && currentUser.role !== 'law_firm')) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
        }

        const reqBody = await request.json();
        const { title, description, clientId } = reqBody;

        await dbConnect();

        const newCase = new Case({
            title,
            description,
            client: clientId,
            lawyer: currentUser.userId,
            status: 'active',
        });

        await newCase.save();

        // Notify Client
        await Notification.create({
            recipient: clientId,
            sender: currentUser.userId,
            type: 'case_assigned',
            message: `A new case "${title}" has been created for you`,
            relatedId: newCase._id,
        });

        return NextResponse.json({
            message: 'Case created successfully',
            data: newCase,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
