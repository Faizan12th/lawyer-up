'use client';

import React, { useState, useEffect } from 'react';
// import { Topbar } from '@/components/dashboard/Topbar';
import { Card } from '@/components/ui/Card';
import { Users, Briefcase, DollarSign, TrendingUp, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function FirmDashboardPage() {
    const [statsData, setStatsData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/firm/stats');
                const data = await res.json();
                if (res.ok) {
                    setStatsData(data.data);
                } else {
                    toast.error(data.error || 'Failed to fetch dashboard data');
                }
            } catch (error) {
                console.error('Error fetching stats:', error);
                toast.error('Failed to load dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const stats = [
        {
            label: 'Total Revenue',
            value: statsData ? `PKR ${statsData.totalRevenue.toLocaleString()}` : 'PKR 0',
            subtext: 'Lifetime earnings',
            icon: DollarSign
        },
        {
            label: 'Active Cases',
            value: statsData?.activeCases?.toString() || '0',
            subtext: 'Currently ongoing',
            icon: Briefcase
        },
        {
            label: 'Total Lawyers',
            value: statsData?.totalLawyers?.toString() || '0',
            subtext: 'Registered with firm',
            icon: Users
        },
        {
            label: 'Success Rate',
            value: statsData ? `${statsData.successRate}%` : '0%',
            subtext: 'Estimated',
            icon: TrendingUp
        },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-900" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pb-8">
            {/* Topbar removed */}

            <div className="px-6 py-6 space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Firm Overview</h2>
                    <p className="text-sm text-muted-foreground">Welcome back, Managing Partner</p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <Card key={index} className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                    <stat.icon className="h-5 w-5 text-gray-900" />
                                </div>
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                    {stat.subtext}
                                </span>
                            </div>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Quick Actions */}
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/firm/lawyers" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors flex flex-col items-center justify-center text-center gap-2 group">
                                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                    <Users className="h-5 w-5 text-blue-600" />
                                </div>
                                <span className="text-sm font-medium">Manage Lawyers</span>
                            </Link>
                            <Link href="/firm/cases" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors flex flex-col items-center justify-center text-center gap-2 group">
                                <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                                    <Briefcase className="h-5 w-5 text-purple-600" />
                                </div>
                                <span className="text-sm font-medium">Assign Case</span>
                            </Link>
                            <Link href="/firm/billing" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors flex flex-col items-center justify-center text-center gap-2 group">
                                <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                                    <DollarSign className="h-5 w-5 text-green-600" />
                                </div>
                                <span className="text-sm font-medium">View Billing</span>
                            </Link>
                            <Link href="/firm/settings" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors flex flex-col items-center justify-center text-center gap-2 group">
                                <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                                    <TrendingUp className="h-5 w-5 text-gray-600" />
                                </div>
                                <span className="text-sm font-medium">Firm Reports</span>
                            </Link>
                        </div>
                    </Card>

                    {/* Recent Activity */}
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold">Recent Activity</h3>
                            <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                                View All <ArrowRight className="h-3 w-3" />
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {statsData?.recentActivities?.length > 0 ? (
                                statsData.recentActivities.map((activity: any) => (
                                    <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                        <div className="h-2 w-2 rounded-full bg-gray-900 mt-2 flex-shrink-0" />
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
                                            <p className="text-xs text-gray-500 mt-0.5">{activity.description}</p>
                                            <span className="text-[10px] text-gray-400 mt-1 block">{activity.time}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 text-center py-4">No recent activity</p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
