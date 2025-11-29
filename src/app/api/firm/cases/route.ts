import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Case from '@/models/Case';
import User from '@/models/User';
import { getDataFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const currentUser = getDataFromToken(request);

        if (!currentUser || currentUser.role !== 'law_firm') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get all lawyers for this firm
        const lawyers = await User.find({ lawFirm: currentUser.userId, role: 'lawyer' });
        const lawyerIds = lawyers.map(l => l._id);

        // Find cases assigned to these lawyers
        const cases = await Case.find({ lawyer: { $in: lawyerIds } })
            .populate('lawyer', 'name email')
            .populate('client', 'name email')
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            data: cases
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
        const { title, description, clientEmail, lawyerId, priority, dueDate } = body;

        if (!title || !clientEmail || !lawyerId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Verify lawyer belongs to firm
        const lawyer = await User.findOne({ _id: lawyerId, lawFirm: currentUser.userId });
        if (!lawyer) {
            return NextResponse.json({ error: 'Invalid lawyer selection' }, { status: 400 });
        }

        // Find client
        let client = await User.findOne({ email: clientEmail });
        if (!client) {
            // For now, we require client to exist. 
            // In a real app, we might create a placeholder or invite them.
            return NextResponse.json({ error: 'Client not found with this email' }, { status: 404 });
        }

        const newCase = await Case.create({
            title,
            description,
            client: client._id,
            lawyer: lawyer._id,
            status: 'active', // Default status
            priority: priority || 'Medium',
            deadline: dueDate ? new Date(dueDate) : undefined,
        });

        return NextResponse.json({
            success: true,
            message: 'Case created successfully',
            data: newCase
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
