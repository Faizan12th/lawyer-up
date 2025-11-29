import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Appointment from '@/models/Appointment';
import { getDataFromToken } from '@/lib/auth';
import NotificationModel from '@/models/Notification';
import Profile from '@/models/Profile';

export async function POST(request: NextRequest) {
    try {
        const currentUser = getDataFromToken(request);
        if (!currentUser) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
        }

        const reqBody = await request.json();
        const { lawyerId, date, startTime, endTime, type, notes } = reqBody;

        await dbConnect();

        // Fetch lawyer's profile to get consultation fee
        const lawyerProfile = await Profile.findOne({ user: lawyerId });
        const consultationFee = lawyerProfile?.consultationFee || 0;

        const newAppointment = new Appointment({
            client: currentUser.userId,
            lawyer: lawyerId,
            date,
            startTime,
            endTime,
            type,
            notes,
            status: 'requested',
            fee: consultationFee,
        });

        await newAppointment.save();

        // Notify Lawyer
        await NotificationModel.create({
            recipient: lawyerId,
            sender: currentUser.userId,
            type: 'appointment_request',
            message: `New appointment request for ${date} at ${startTime}`,
            relatedId: newAppointment._id,
        });

        return NextResponse.json({
            message: 'Appointment requested successfully',
            data: newAppointment,
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

        await dbConnect();

        let query: any = {};
        if (currentUser.role === 'client') {
            query.client = currentUser.userId;
        } else if (currentUser.role === 'lawyer' || currentUser.role === 'law_firm') {
            query.lawyer = currentUser.userId;
        }

        const appointments = await Appointment.find(query)
            .populate('client', 'name image')
            .populate('lawyer', 'name image')
            .sort({ date: 1 });

        return NextResponse.json({
            message: 'Appointments fetched successfully',
            data: appointments,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
