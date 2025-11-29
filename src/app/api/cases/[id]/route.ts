import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Case from '@/models/Case';
import { getDataFromToken } from '@/lib/auth';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const currentUser = getDataFromToken(request);
        if (!currentUser) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
        }

        const { id } = await params;
        await dbConnect();

        const caseDetails = await Case.findById(id)
            .populate('client', 'name image')
            .populate('lawyer', 'name image');

        if (!caseDetails) {
            return NextResponse.json({ error: 'Case not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: 'Case details fetched successfully',
            data: caseDetails,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const currentUser = getDataFromToken(request);
        if (!currentUser || (currentUser.role !== 'lawyer' && currentUser.role !== 'law_firm')) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
        }

        const { id } = await params;
        const reqBody = await request.json();
        const { status, event } = reqBody;

        await dbConnect();

        const caseToUpdate = await Case.findById(id);
        if (!caseToUpdate) {
            return NextResponse.json({ error: 'Case not found' }, { status: 404 });
        }

        if (status) {
            caseToUpdate.status = status;
        }

        if (event) {
            caseToUpdate.events.push(event);
        }

        await caseToUpdate.save();

        return NextResponse.json({
            message: 'Case updated successfully',
            data: caseToUpdate,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
