'use client';

import React, { useEffect, useState } from 'react';
import { Users, Briefcase, Building2, AlertCircle, Loader2 } from 'lucide-react';
import { StatsCard } from '@/components/admin/StatsCard';
import { RegistrationsChart } from '@/components/admin/charts/RegistrationsChart';
import { ActiveUsersChart } from '@/components/admin/charts/ActiveUsersChart';
import { TransactionsChart } from '@/components/admin/charts/TransactionsChart';
import { ActivityTable } from '@/components/admin/ActivityTable';
import { toast } from 'react-hot-toast';

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/stats');
                const data = await res.json();
                if (res.ok) {
                    setStats(data.data);
                } else {
                    toast.error(data.error || 'Failed to fetch stats');
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
                toast.error('Failed to load dashboard stats');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-900" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Total Lawyers"
                    value={stats?.counts?.lawyers?.toString() || '0'}
                    change="+0" // TODO: Calculate change
                    trend="neutral"
                    icon={Users}
                    subtext="Total registered lawyers"
                />
                <StatsCard
                    title="Total Clients"
                    value={stats?.counts?.clients?.toString() || '0'}
                    change="+0"
                    trend="neutral"
                    icon={Users}
                    subtext="Total registered clients"
                />
                <StatsCard
                    title="Law Firms"
                    value={stats?.counts?.firms?.toString() || '0'}
                    change="+0"
                    trend="neutral"
                    icon={Building2}
                    subtext="Total registered firms"
                />
                <StatsCard
                    title="Pending Verifications"
                    value={stats?.counts?.pending?.toString() || '0'}
                    change={stats?.counts?.pending > 0 ? "Requires attention" : "All caught up"}
                    trend={stats?.counts?.pending > 0 ? "down" : "neutral"}
                    icon={AlertCircle}
                    subtext="Lawyers & Firms awaiting approval"
                />
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 lg:grid-cols-2">
                <RegistrationsChart data={stats?.registrations} />
                <ActiveUsersChart active={stats?.activity?.active} total={stats?.activity?.total} />
            </div>

            <div className="grid gap-6">
                <TransactionsChart />
            </div>

            {/* Recent Activity */}
            <ActivityTable />
        </div>
    );
}
