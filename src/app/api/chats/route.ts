import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Chat } from '@/models/Chat';
import Appointment from '@/models/Appointment';
import { getDataFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const currentUser = getDataFromToken(request);
        if (!currentUser) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
        }

        await dbConnect();

        const chats = await Chat.find({
            participants: { $in: [currentUser.userId] },
        })
            .populate('participants', 'name image role')
            .populate('lastMessage')
            .sort({ updatedAt: -1 });

        return NextResponse.json({
            message: 'Chats fetched successfully',
            data: chats,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const currentUser = getDataFromToken(request);
        if (!currentUser) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
        }

        const reqBody = await request.json();
        const { recipientId } = reqBody;

        await dbConnect();

        // Check if chat already exists
        const existingChat = await Chat.findOne({
            participants: { $all: [currentUser.userId, recipientId] },
        });

        if (existingChat) {
            return NextResponse.json({
                message: 'Chat already exists',
                data: existingChat,
            });
        }

        // Check for valid appointment (upcoming or completed)
        // We check both directions: current user as client OR lawyer
        const hasValidAppointment = await Appointment.findOne({
            $or: [
                { client: currentUser.userId, lawyer: recipientId },
                { client: recipientId, lawyer: currentUser.userId }
            ],
            status: { $in: ['upcoming', 'completed'] }
        });

        if (!hasValidAppointment) {
            return NextResponse.json({
                error: 'You can only start a chat after an appointment is confirmed (upcoming or completed).'
            }, { status: 403 });
        }

        const newChat = new Chat({
            participants: [currentUser.userId, recipientId],
        });

        await newChat.save();

        return NextResponse.json({
            message: 'Chat created successfully',
            data: newChat,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
