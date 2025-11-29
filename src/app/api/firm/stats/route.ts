import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Case from '@/models/Case';
import Appointment from '@/models/Appointment';
import { getDataFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const currentUser = getDataFromToken(request);

        if (!currentUser || currentUser.role !== 'law_firm') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 1. Get all lawyers linked to this firm
        const lawyers = await User.find({ lawFirm: currentUser.userId });
        const lawyerIds = lawyers.map(l => l._id);

        // 2. Get active cases for these lawyers
        const activeCases = await Case.find({
            lawyer: { $in: lawyerIds },
            status: 'active'
        });

        // 3. Get completed appointments for revenue calculation
        const completedAppointments = await Appointment.find({
            lawyer: { $in: lawyerIds },
            status: 'completed'
        });

        const totalRevenue = completedAppointments.reduce((sum, apt) => sum + (apt.fee || 0), 0);

        // 4. Get recent activities (simplified: just recent cases and new lawyers for now)
        // In a real app, you'd might want a separate ActivityLog model
        const recentCases = await Case.find({ lawyer: { $in: lawyerIds } })
            .sort({ createdAt: -1 })
            .limit(3)
            .populate('lawyer', 'name')
            .populate('client', 'name');

        const recentActivities = recentCases.map(c => ({
            id: c._id,
            title: 'New Case Assigned',
            description: `Case ${c.title} assigned to ${(c.lawyer as any).name}`,
            time: new Date(c.createdAt).toLocaleDateString()
        }));

        return NextResponse.json({
            success: true,
            data: {
                totalRevenue,
                activeCases: activeCases.length,
                totalLawyers: lawyers.length,
                successRate: 92, // Placeholder, logic would be complex
                recentActivities
            }
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
