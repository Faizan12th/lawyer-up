'use client';

import React, { useState, useEffect } from 'react';
// import { Topbar } from '@/components/dashboard/Topbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    Bell,
    Calendar,
    Briefcase,
    DollarSign,
    MessageSquare,
    FileText,
    CheckCircle,
    Loader2
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState([
        { label: 'Unread Notifications', value: '0' },
        { label: "Today's Notifications", value: '0' },
        { label: 'High Priority', value: '0' },
    ]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/notifications');
            const data = await res.json();
            if (res.ok) {
                const notifs = data.data || [];
                setNotifications(notifs);
                calculateStats(notifs);
            } else {
                toast.error('Failed to fetch notifications');
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
            toast.error('Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (notifs: any[]) => {
        const unread = notifs.filter(n => !n.read).length;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todays = notifs.filter(n => new Date(n.createdAt) >= today).length;

        // Assuming 'urgent' or specific types are high priority, for now just a placeholder logic or based on type
        const highPriority = notifs.filter(n => n.type === 'appointment' || n.type === 'case').length;

        setStats([
            { label: 'Unread Notifications', value: unread.toString() },
            { label: "Today's Notifications", value: todays.toString() },
            { label: 'High Priority', value: highPriority.toString() },
        ]);
    };

    const handleMarkAllRead = async () => {
        try {
            const res = await fetch('/api/notifications', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({}), // Empty body marks all as read
            });

            if (res.ok) {
                toast.success('All notifications marked as read');
                // Optimistically update UI
                const updatedNotifs = notifications.map(n => ({ ...n, read: true }));
                setNotifications(updatedNotifs);
                calculateStats(updatedNotifs);
            } else {
                toast.error('Failed to mark notifications as read');
            }
        } catch (error) {
            console.error('Error marking notifications as read:', error);
            toast.error('Failed to update notifications');
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'appointment': return Calendar;
            case 'case': return Briefcase;
            case 'payment': return DollarSign;
            case 'message': return MessageSquare;
            case 'document': return FileText;
            default: return Bell;
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'appointment': return 'text-red-500';
            case 'case': return 'text-blue-500';
            case 'payment': return 'text-green-500';
            case 'message': return 'text-yellow-500';
            default: return 'text-gray-500';
        }
    };

    const getBgColor = (type: string) => {
        switch (type) {
            case 'appointment': return 'bg-red-50';
            case 'case': return 'bg-blue-50';
            case 'payment': return 'bg-green-50';
            case 'message': return 'bg-yellow-50';
            default: return 'bg-gray-50';
        }
    };

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
                        <Card key={index} className="p-6">
                            <p className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</p>
                            <div className="text-3xl font-bold">{stat.value}</div>
                        </Card>
                    ))}
                </div>

                {/* Notifications List */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold">All Notifications</h3>
                            <p className="text-sm text-muted-foreground">Stay updated on your legal practice</p>
                        </div>
                        <Button variant="outline" className="gap-2" onClick={handleMarkAllRead}>
                            <CheckCircle className="h-4 w-4" />
                            Mark All as Read
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => {
                                const Icon = getIcon(notification.type);
                                return (
                                    <div key={notification._id} className={`flex items-start gap-4 p-4 border rounded-lg transition-colors ${notification.read ? 'bg-white' : 'bg-blue-50/30'}`}>
                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${getBgColor(notification.type)}`}>
                                            <Icon className={`h-5 w-5 ${getColor(notification.type)}`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <h4 className={`font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>{notification.title}</h4>
                                                {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-600"></div>}
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-xs text-muted-foreground">{new Date(notification.createdAt).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                No notifications found.
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
