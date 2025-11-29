import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import VerificationDocument from '@/models/VerificationDocument';
import { getDataFromToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const currentUser = getDataFromToken(request);
        if (!currentUser) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
        }

        const reqBody = await request.json();
        const { documents } = reqBody;

        if (!documents || !Array.isArray(documents)) {
            return NextResponse.json({ error: 'Invalid documents data' }, { status: 400 });
        }

        await dbConnect();

        const createdDocs = [];
        for (const doc of documents) {
            const newDoc = new VerificationDocument({
                user: currentUser.userId,
                type: doc.type,
                url: doc.url,
                publicId: doc.publicId,
                status: 'pending',
            });
            await newDoc.save();
            createdDocs.push(newDoc);
        }

        return NextResponse.json({
            message: 'Verification documents submitted successfully',
            data: createdDocs,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const currentUser = getDataFromToken(request);
        if (!currentUser) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        // Allow admins to view any docs, or users to view their own
        if (currentUser.role !== 'admin' && currentUser.userId !== userId) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
        }

        await dbConnect();

        const documents = await VerificationDocument.find({ user: userId });

        return NextResponse.json({
            message: 'Documents fetched successfully',
            data: documents,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
