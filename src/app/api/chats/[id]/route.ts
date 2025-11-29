import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Chat, Message } from '@/models/Chat';
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

        const messages = await Message.find({ chat: id })
            .populate('sender', 'name image')
            .sort({ createdAt: 1 });

        return NextResponse.json({
            message: 'Messages fetched successfully',
            data: messages,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const currentUser = getDataFromToken(request);
        if (!currentUser) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
        }

        const { id } = await params;
        const reqBody = await request.json();
        const { content } = reqBody;

        await dbConnect();

        const newMessage = new Message({
            chat: id,
            sender: currentUser.userId,
            content,
            readBy: [currentUser.userId],
        });

        await newMessage.save();

        // Update last message in Chat
        await Chat.findByIdAndUpdate(id, {
            lastMessage: newMessage._id,
        });

        return NextResponse.json({
            message: 'Message sent successfully',
            data: newMessage,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
