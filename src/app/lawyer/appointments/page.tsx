'use client';

import React, { useState, useEffect } from 'react';
// import { Topbar } from '@/components/dashboard/Topbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    Calendar as CalendarIcon,
    Clock,
    Video,
    MapPin,
    Check,
    X,
    MessageSquare,
    User,
    ChevronLeft,
    ChevronRight,
    Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AppointmentsPage() {
    const [activeTab, setActiveTab] = useState<'pending' | 'scheduled' | 'history'>('pending');
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/appointments');
            const data = await res.json();
            if (res.ok) {
                setAppointments(data.data || []);
            } else {
                toast.error(data.error || 'Failed to fetch appointments');
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error('Failed to load appointments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/appointments/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(`Appointment ${status === 'upcoming' ? 'accepted' : 'rejected'}`);
                fetchAppointments(); // Refresh list
            } else {
                toast.error(data.error || 'Failed to update appointment');
            }
        } catch (error) {
            console.error('Error updating appointment:', error);
            toast.error('Failed to update appointment');
        }
    };

    const pendingAppointments = appointments.filter(a => a.status === 'requested');
    const scheduledAppointments = appointments.filter(a => a.status === 'upcoming');
    const historyAppointments = appointments.filter(a => ['completed', 'cancelled', 'rejected'].includes(a.status));

    const stats = [
        { label: 'Pending Requests', value: pendingAppointments.length.toString() },
        { label: "Today's Appointments", value: appointments.filter(a => a.date === new Date().toISOString().split('T')[0] && a.status === 'upcoming').length.toString() },
        { label: 'Upcoming', value: scheduledAppointments.length.toString() },
        { label: 'Total History', value: historyAppointments.length.toString() },
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
                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <Card key={index} className="p-6">
                            <p className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</p>
                            <div className="text-3xl font-bold">{stat.value}</div>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Calendar Section */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 h-full">
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold">Calendar</h3>
                                <p className="text-sm text-muted-foreground">View your schedule</p>
                            </div>

                            <div className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <button className="p-1 hover:bg-gray-100 rounded-full">
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    <span className="font-semibold">October 2025</span>
                                    <button className="p-1 hover:bg-gray-100 rounded-full">
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-7 text-center text-xs mb-2 text-muted-foreground">
                                    <div>Su</div>
                                    <div>Mo</div>
                                    <div>Tu</div>
                                    <div>We</div>
                                    <div>Th</div>
                                    <div>Fr</div>
                                    <div>Sa</div>
                                </div>

                                <div className="grid grid-cols-7 text-center text-sm gap-y-4">
                                    {/* Calendar days would go here - simplified for now */}
                                    <div className="text-muted-foreground">28</div>
                                    <div className="text-muted-foreground">29</div>
                                    <div className="text-muted-foreground">30</div>
                                    <div>1</div>
                                    <div>2</div>
                                    <div>3</div>
                                    <div>4</div>
                                    <div>5</div>
                                    <div>6</div>
                                    <div>7</div>
                                    <div>8</div>
                                    <div>9</div>
                                    <div>10</div>
                                    <div className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto">11</div>
                                    {/* ... rest of calendar ... */}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Appointments List Section */}
                    <div className="lg:col-span-2">
                        <Card className="p-6 h-full">
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold">Appointments</h3>
                            </div>

                            {/* Tabs */}
                            <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
                                <button
                                    onClick={() => setActiveTab('pending')}
                                    className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${activeTab === 'pending' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    Pending ({pendingAppointments.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('scheduled')}
                                    className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${activeTab === 'scheduled' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    Scheduled ({scheduledAppointments.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('history')}
                                    className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${activeTab === 'history' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    History
                                </button>
                            </div>

                            {/* Content */}
                            <div className="space-y-4">
                                {activeTab === 'pending' && (
                                    pendingAppointments.length > 0 ? pendingAppointments.map((apt) => (
                                        <div key={apt._id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50/50 transition-colors">
                                            <div className="flex items-start gap-4 mb-4 md:mb-0">
                                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                    {apt.client?.image ? (
                                                        <img src={apt.client.image} alt={apt.client.name} className="h-10 w-10 rounded-full object-cover" />
                                                    ) : (
                                                        <User className="h-5 w-5 text-gray-600" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">{apt.client?.name || 'Unknown Client'}</h4>
                                                    <p className="text-sm text-muted-foreground capitalize">{apt.type}</p>
                                                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <CalendarIcon className="h-4 w-4" />
                                                            {new Date(apt.date).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            {apt.startTime}
                                                        </div>
                                                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground">
                                                            {apt.type}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm font-medium mt-2">Fee: PKR {apt.fee}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 w-full md:w-auto">
                                                <Button onClick={() => handleStatusUpdate(apt._id, 'upcoming')} className="flex-1 md:flex-none bg-gray-900 hover:bg-gray-800 text-white gap-2">
                                                    <Check className="h-4 w-4" /> Accept
                                                </Button>
                                                <Button onClick={() => handleStatusUpdate(apt._id, 'rejected')} variant="outline" className="flex-1 md:flex-none text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200 gap-2">
                                                    <X className="h-4 w-4" /> Reject
                                                </Button>
                                            </div>
                                        </div>
                                    )) : <p className="text-center text-gray-500 py-8">No pending requests</p>
                                )}

                                {activeTab === 'scheduled' && (
                                    scheduledAppointments.length > 0 ? scheduledAppointments.map((apt) => (
                                        <div key={apt._id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50/50 transition-colors">
                                            <div className="flex items-start gap-4 mb-4 md:mb-0">
                                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                    {apt.client?.image ? (
                                                        <img src={apt.client.image} alt={apt.client.name} className="h-10 w-10 rounded-full object-cover" />
                                                    ) : (
                                                        <User className="h-5 w-5 text-gray-600" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">{apt.client?.name || 'Unknown Client'}</h4>
                                                    <p className="text-sm text-muted-foreground capitalize">{apt.type}</p>
                                                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <CalendarIcon className="h-4 w-4" />
                                                            {new Date(apt.date).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            {apt.startTime}
                                                        </div>
                                                        <span className="inline-flex items-center rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-medium text-white capitalize">
                                                            {apt.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 w-full md:w-auto">
                                                <Button className="flex-1 md:flex-none bg-gray-900 hover:bg-gray-800 text-white gap-2">
                                                    <Video className="h-4 w-4" /> Join
                                                </Button>
                                                <Button variant="outline" className="flex-1 md:flex-none gap-2">
                                                    <MessageSquare className="h-4 w-4" /> Chat
                                                </Button>
                                            </div>
                                        </div>
                                    )) : <p className="text-center text-gray-500 py-8">No scheduled appointments</p>
                                )}

                                {activeTab === 'history' && (
                                    historyAppointments.length > 0 ? historyAppointments.map((apt) => (
                                        <div key={apt._id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50/50 transition-colors">
                                            <div className="flex items-start gap-4 mb-4 md:mb-0">
                                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                                    {apt.client?.image ? (
                                                        <img src={apt.client.image} alt={apt.client.name} className="h-10 w-10 rounded-full object-cover" />
                                                    ) : (
                                                        <User className="h-5 w-5 text-gray-600" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">{apt.client?.name || 'Unknown Client'}</h4>
                                                    <p className="text-sm text-muted-foreground capitalize">{apt.type}</p>
                                                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <CalendarIcon className="h-4 w-4" />
                                                            {new Date(apt.date).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            {apt.startTime}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize
                                                    ${apt.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                        apt.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                            'bg-gray-100 text-gray-800'}`}>
                                                    {apt.status}
                                                </span>
                                            </div>
                                        </div>
                                    )) : <p className="text-center text-gray-500 py-8">No appointment history</p>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
