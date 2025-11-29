import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
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

        // 3. Recent Registrations (Last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentUsers = await User.find({
            createdAt: { $gte: sevenDaysAgo }
        }).select('createdAt role');

        // Group by date for chart
        const registrationsByDate = recentUsers.reduce((acc: any, user) => {
            const date = user.createdAt.toISOString().split('T')[0];
            if (!acc[date]) acc[date] = 0;
            acc[date]++;
            return acc;
        }, {});

        // 4. Active Users (Active status)
        const activeUsers = await User.countDocuments({ status: 'active' });
        const totalUsers = await User.countDocuments({});

        return NextResponse.json({
            message: 'Stats fetched successfully',
            data: {
                counts: {
                    lawyers: totalLawyers,
                    clients: totalClients,
                    firms: totalFirms,
                    pending: pendingVerifications
                },
                registrations: registrationsByDate,
                activity: {
                    active: activeUsers,
                    total: totalUsers
                }
            }
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
