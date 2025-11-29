import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Appointment from '@/models/Appointment';
import { getDataFromToken } from '@/lib/auth';
import Notification from '@/models/Notification';

export async function PUT(
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
        const { status } = reqBody;

        await dbConnect();

        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
        }

        // Verify ownership
        if (
            appointment.client.toString() !== currentUser.userId &&
            appointment.lawyer.toString() !== currentUser.userId
        ) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
        }

        appointment.status = status;
        await appointment.save();

        // Notify other party
        const recipientId =
            currentUser.userId === appointment.client.toString()
                ? appointment.lawyer
                : appointment.client;

        await Notification.create({
            recipient: recipientId,
            sender: currentUser.userId,
            type: status === 'upcoming' ? 'appointment_accepted' : 'appointment_rejected',
            message: `Appointment status updated to ${status}`,
            relatedId: appointment._id,
        });

        return NextResponse.json({
            message: 'Appointment updated successfully',
            data: appointment,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
