'use client';

import React, { useState, useEffect } from 'react';
import { Topbar } from '@/components/dashboard/Topbar';
import { Card } from '@/components/ui/Card';
import { Briefcase, Calendar, Clock, DollarSign, Star, Loader2, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function LawyerDashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/lawyer/stats');
                const result = await res.json();
                if (res.ok) {
                    setData(result.data);
                }
            } catch (error) {
                console.error('Failed to fetch dashboard stats', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
                <p className="text-gray-500">Failed to load dashboard data.</p>
            </div>
        );
    }

    const { stats, recentCases, upcomingAppointments, recentReviews } = data;

    const statsCards = [
        {
            label: 'Active Cases',
            value: stats.activeCases,
            subtext: 'Currently active',
            icon: Briefcase,
        },
        {
            label: 'Upcoming Hearings',
            value: stats.upcomingHearings,
            subtext: 'Scheduled hearings',
            icon: Clock,
        },
        {
            label: 'Pending Consultations',
            value: stats.pendingConsultations,
            subtext: 'Awaiting confirmation',
            icon: Calendar,
        },
        {
            label: 'Earnings This Month',
            value: `PKR ${stats.earnings.toLocaleString()}`,
            subtext: 'Estimated',
            icon: DollarSign,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 pb-8">
            <Topbar title="Dashboard" subtitle="Welcome back, Advocate" />

            <div className="px-6 py-6 space-y-6">
                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {statsCards.map((stat, index) => (
                        <Card key={index} className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                                <stat.icon className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">{stat.subtext}</p>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Recent Cases */}
                    <Card className="p-6">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold">Recent Cases</h3>
                            <p className="text-sm text-muted-foreground">Latest case updates</p>
                        </div>
                        <div className="space-y-6">
                            {recentCases.length > 0 ? (
                                recentCases.map((item: any, index: number) => (
                                    <div key={index} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                                        <div>
                                            <p className="font-medium">{item.title}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                                                    {item.type}
                                                </span>
                                                <span className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        <span className="text-sm text-muted-foreground capitalize">{item.status}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">No recent cases.</p>
                            )}
                        </div>
                    </Card>

                    {/* Upcoming Appointments */}
                    <Card className="p-6">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
                            <p className="text-sm text-muted-foreground">Confirmed schedule</p>
                        </div>
                        <div className="space-y-6">
                            {upcomingAppointments.length > 0 ? (
                                upcomingAppointments.map((item: any, index: number) => (
                                    <div key={index} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                                        <div>
                                            <p className="font-medium">{item.client?.name || 'Unknown Client'}</p>
                                            <p className="text-xs text-muted-foreground mt-1 capitalize">{item.type}</p>
                                        </div>
                                        <div className="text-right flex flex-col items-end">
                                            <p className="font-medium">{item.startTime}</p>
                                            <span className="text-xs text-green-600 capitalize mb-1">
                                                {item.status}
                                            </span>
                                            {item.client?._id && (
                                                <Link
                                                    href={`/lawyer/chat?userId=${item.client._id}`}
                                                    className="inline-flex items-center justify-center p-1.5 hover:bg-gray-100 rounded-full text-gray-600"
                                                    title="Chat with Client"
                                                >
                                                    <MessageSquare className="h-4 w-4" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground">No upcoming appointments.</p>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Recent Reviews */}
                <Card className="p-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold">Recent Client Reviews</h3>
                        <p className="text-sm text-muted-foreground">Latest feedback from clients</p>
                    </div>
                    <div className="space-y-6">
                        {recentReviews.length > 0 ? (
                            recentReviews.map((review: any, index: number) => (
                                <div key={index} className="border-b border-border pb-6 last:border-0 last:pb-0">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="font-medium">{review.client?.name || 'Anonymous'}</p>
                                        <span className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-3 w-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">No reviews yet.</p>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
