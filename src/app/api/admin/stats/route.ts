import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Appointment from '@/models/Appointment';
import Review from '@/models/Review';
import { getDataFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const currentUser = getDataFromToken(request);
        if (!currentUser || currentUser.role !== 'admin') {
            return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
        }

        await dbConnect();

        // 1. Total Counts
        const totalLawyers = await User.countDocuments({ role: { $in: ['lawyer'] } });
        const totalClients = await User.countDocuments({ role: 'client' });
        const totalFirms = await User.countDocuments({ role: 'law_firm' });

        // 2. Pending Verifications (Lawyers/Firms with pending status)
        const pendingVerifications = await User.countDocuments({
            role: { $in: ['lawyer', 'law_firm'] },
            status: 'pending'
        });

        // 3. Monthly Registrations (Last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1); // Start of the month

        const monthlyUsers = await User.find({
            createdAt: { $gte: sixMonthsAgo }
        }).select('createdAt role');

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Initialize last 6 months
        const registrationsByMonth: { month: string; clients: number; firms: number; lawyers: number }[] = [];
        for (let i = 0; i < 6; i++) {
            const d = new Date();
            d.setMonth(d.getMonth() - (5 - i));
            registrationsByMonth.push({
                month: months[d.getMonth()],
                clients: 0,
                firms: 0,
                lawyers: 0
            });
        }

        monthlyUsers.forEach((user: any) => {
            const monthIndex = user.createdAt.getMonth();
            const monthName = months[monthIndex];
            const monthData = registrationsByMonth.find(m => m.month === monthName);

            if (monthData) {
                if (user.role === 'client') monthData.clients++;
                else if (user.role === 'law_firm') monthData.firms++;
                else if (user.role === 'lawyer') monthData.lawyers++;
            }
        });

        // 4. Active Users Trend (Mocking historical data based on current active count)
        // In a real app, you'd track daily/monthly active users in a separate collection
        const currentActive = await User.countDocuments({ status: 'active' });
        const totalUsers = await User.countDocuments({});

        // Generate trend data (simulated for now as we don't have historical activity tracking)
        const activeUsersTrend = registrationsByMonth.map(m => ({
            month: m.month,
            clients: Math.floor(currentActive * 0.7 * (0.5 + Math.random() * 0.5)), // Simulated
            lawyers: Math.floor(currentActive * 0.3 * (0.5 + Math.random() * 0.5))  // Simulated
        }));
        // Set current month to actuals (approx)
        activeUsersTrend[5].clients = Math.floor(currentActive * 0.7);
        activeUsersTrend[5].lawyers = Math.floor(currentActive * 0.3);

        // 5. Recent Activities (Aggregated)
        const latestUsers = await User.find().sort({ createdAt: -1 }).limit(5).select('name role createdAt');
        const latestAppointments = await Appointment.find().populate('client', 'name').populate('lawyer', 'name').sort({ createdAt: -1 }).limit(5);
        const latestReviews = await Review.find().populate('client', 'name').sort({ createdAt: -1 }).limit(5);

        const activities = [
            ...latestUsers.map((u: any) => ({
                id: u._id,
                type: 'User Registration',
                user: u.name,
                action: `New ${u.role} registered`,
                time: u.createdAt,
                status: 'info'
            })),
            ...latestAppointments.map((a: any) => ({
                id: a._id,
                type: 'Appointment',
                user: a.client?.name || 'Unknown',
                action: `${a.type} appointment requested`,
                time: a.createdAt,
                status: 'pending'
            })),
            ...latestReviews.map((r: any) => ({
                id: r._id,
                type: 'Review',
                user: r.client?.name || 'Unknown',
                action: `${r.rating} star review submitted`,
                time: r.createdAt,
                status: 'success'
            }))
        ].sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 10);

        return NextResponse.json({
            message: 'Stats fetched successfully',
            data: {
                counts: {
                    lawyers: totalLawyers,
                    clients: totalClients,
                    firms: totalFirms,
                    pending: pendingVerifications
                },
                registrations: registrationsByMonth,
                activity: {
                    active: currentActive,
                    total: totalUsers,
                    trend: activeUsersTrend
                },
                recentActivities: activities
            }
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
