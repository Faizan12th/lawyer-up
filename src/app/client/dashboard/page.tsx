'use client';

import React, { useEffect, useState } from 'react';
// import { Topbar } from '@/components/dashboard/Topbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import {
    MessageSquare,
    Calendar,
    DollarSign,
    Search,
    HelpCircle,
    Settings,
    User,
    Star,
    ChevronRight,
    ChevronLeft,
    Loader2
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { LawyerCard } from '@/components/client/LawyerCard';

export default function ClientDashboard() {
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState([
        { label: 'Active Consultations', value: '0', subtext: 'In progress', icon: MessageSquare },
        { label: 'Pending Payments', value: '0', subtext: 'Due', icon: DollarSign },
        { label: 'Upcoming Appointments', value: '0', subtext: 'Next: None', icon: Calendar },
    ]);
    const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([]);
    const [recentConsultations, setRecentConsultations] = useState<any[]>([]);
    const [recommendedLawyers, setRecommendedLawyers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const quickLinks = [
        { icon: Search, label: 'Find a Lawyer', href: '/client/find-lawyer', color: 'bg-gray-900 text-white' },
        { icon: Calendar, label: 'My Appointments', href: '/client/appointments', color: 'bg-gray-100 text-gray-900' },
        { icon: HelpCircle, label: 'Support Center', href: '/client/support', color: 'bg-gray-100 text-gray-900' },
        { icon: Settings, label: 'Settings', href: '/client/settings', color: 'bg-gray-100 text-gray-900' },
    ];

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                // 1. Fetch User Profile
                const userRes = await fetch('/api/auth/me');
                const userData = await userRes.json();
                if (userRes.ok) {
                    setUser(userData.data);
                }

                // 2. Fetch Cases (Active Consultations)
                const casesRes = await fetch('/api/cases');
                const casesData = await casesRes.json();
                const activeCases = casesData.data?.filter((c: any) => c.status === 'active') || [];

                // 3. Fetch Appointments
                const aptRes = await fetch('/api/appointments');
                const aptData = await aptRes.json();
                const appointments = aptData.data || [];

                const now = new Date();
                const upcoming = appointments.filter((a: any) => new Date(a.date) >= now && a.status !== 'cancelled' && a.status !== 'rejected');
                const recent = appointments.filter((a: any) => new Date(a.date) < now || a.status === 'completed');

                // Sort upcoming by date ascending
                upcoming.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
                // Sort recent by date descending
                recent.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

                setUpcomingAppointments(upcoming.slice(0, 3));
                setRecentConsultations(recent.slice(0, 3));

                // Calculate Stats
                const nextApt = upcoming[0];
                const nextAptText = nextApt
                    ? `Next: ${new Date(nextApt.date).toLocaleDateString()} ${nextApt.startTime}`
                    : 'Next: None';

                setStats([
                    { label: 'Active Consultations', value: activeCases.length.toString(), subtext: 'In progress', icon: MessageSquare },
                    { label: 'Pending Payments', value: '0', subtext: 'Due', icon: DollarSign }, // Placeholder for payments
                    { label: 'Upcoming Appointments', value: upcoming.length.toString(), subtext: nextAptText, icon: Calendar },
                ]);

                // 4. Fetch Recommended Lawyers
                const lawyersRes = await fetch('/api/lawyers/search');
                const lawyersData = await lawyersRes.json();
                if (lawyersRes.ok) {
                    setRecommendedLawyers(lawyersData.data?.slice(0, 3) || []);
                }

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                toast.error('Failed to load dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin text-gray-900" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pb-8">
            {/* Topbar removed */}

            <div className="px-6 py-6 space-y-6">
                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-3">
                    {stats.map((stat, index) => (
                        <Card key={index} className="p-6 relative overflow-hidden">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</p>
                                    <div className="text-3xl font-bold">{stat.value}</div>
                                    <p className="text-xs text-muted-foreground mt-1">{stat.subtext}</p>
                                </div>
                                <stat.icon className="h-5 w-5 text-gray-400" />
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Quick Links */}
                <Card className="p-6">
                    <div className="mb-4">
                        <h3 className="font-semibold">Quick Links</h3>
                        <p className="text-sm text-muted-foreground">Access important features</p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-4">
                        {quickLinks.map((link, index) => (
                            <Link key={index} href={link.href} className={`flex flex-col items-center justify-center p-6 rounded-lg transition-all hover:opacity-90 ${link.color}`}>
                                <link.icon className="h-6 w-6 mb-2" />
                                <span className="font-medium text-sm">{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </Card>

                {/* Recommended Lawyers */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-semibold">Recommended Lawyers</h3>
                            <p className="text-sm text-muted-foreground">Top-rated lawyers based on your needs</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-1 hover:bg-gray-100 rounded-md border">
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded-md border">
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {recommendedLawyers.map((lawyer, index) => (
                            <LawyerCard key={index} profile={lawyer} />
                        ))}
                        {recommendedLawyers.length === 0 && (
                            <div className="col-span-3 text-center py-8 text-muted-foreground">
                                No lawyers found.
                            </div>
                        )}
                    </div>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Upcoming Appointments List */}
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Upcoming Appointments</h3>
                        <div className="space-y-4">
                            {upcomingAppointments.map((apt, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-sm">{apt.lawyer?.name || 'Unknown Lawyer'}</h4>
                                        <p className="text-xs text-muted-foreground">{apt.type}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {new Date(apt.date).toLocaleDateString()} at {apt.startTime}
                                        </p>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                        apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                        {apt.status}
                                    </span>
                                    {apt.lawyer?._id && (
                                        <Link
                                            href={`/client/chat?userId=${apt.lawyer._id}`}
                                            className="ml-2 p-2 hover:bg-gray-100 rounded-full text-gray-600"
                                            title="Chat with Lawyer"
                                        >
                                            <MessageSquare className="h-4 w-4" />
                                        </Link>
                                    )}
                                </div>
                            ))}
                            {upcomingAppointments.length === 0 && (
                                <p className="text-sm text-muted-foreground">No upcoming appointments.</p>
                            )}
                        </div>
                    </Card>

                    {/* Recent Consultations List */}
                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">Recent Consultations</h3>
                        <div className="space-y-4">
                            {recentConsultations.map((consult, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-sm">{consult.lawyer?.name || 'Unknown Lawyer'}</h4>
                                        <p className="text-xs text-muted-foreground">{consult.type}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {new Date(consult.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-3 w-3 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {recentConsultations.length === 0 && (
                                <p className="text-sm text-muted-foreground">No recent consultations.</p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
