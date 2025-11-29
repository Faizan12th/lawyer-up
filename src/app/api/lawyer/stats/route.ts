import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Case from '@/models/Case';
import Appointment from '@/models/Appointment';
import Review from '@/models/Review';
import { getDataFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const currentUser = getDataFromToken(request);
        if (!currentUser || currentUser.role !== 'lawyer') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const lawyerId = currentUser.userId;

        const [
            activeCasesCount,
            upcomingHearingsCount,
            pendingConsultationsCount,
            recentCases,
            upcomingAppointments,
            recentReviews,
            completedAppointments
        ] = await Promise.all([
            Case.countDocuments({ lawyer: lawyerId, status: 'active' }),
            Appointment.countDocuments({ lawyer: lawyerId, type: 'hearing', status: 'upcoming', date: { $gte: new Date() } }),
            Appointment.countDocuments({ lawyer: lawyerId, status: 'requested' }),
            Case.find({ lawyer: lawyerId }).sort({ createdAt: -1 }).limit(5),
            Appointment.find({ lawyer: lawyerId, status: 'upcoming', date: { $gte: new Date() } }).populate('client', 'name').sort({ date: 1 }).limit(5),
            Review.find({ lawyer: lawyerId }).populate('client', 'name').sort({ createdAt: -1 }).limit(5),
            Appointment.find({ lawyer: lawyerId, status: 'completed' })
        ]);

        const totalEarnings = completedAppointments.reduce((sum, appt) => sum + (appt.fee || 0), 0);

        return NextResponse.json({
            success: true,
            data: {
                stats: {
                    activeCases: activeCasesCount,
                    upcomingHearings: upcomingHearingsCount,
                    pendingConsultations: pendingConsultationsCount,
                    earnings: totalEarnings,
                },
                recentCases,
                upcomingAppointments,
                recentReviews
            }
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
