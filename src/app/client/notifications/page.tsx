'use client';

import React, { useState, useEffect } from 'react';
// import { Topbar } from '@/components/dashboard/Topbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    Bell,
    Calendar,
    DollarSign,
    MessageSquare,
    Clock,
    CheckCircle,
    Settings,
    Loader2
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ClientNotificationsPage() {
    const [emailNotif, setEmailNotif] = useState(true);
    const [smsNotif, setSmsNotif] = useState(false);
    const [apptReminders, setApptReminders] = useState(true);
    const [paymentUpdates, setPaymentUpdates] = useState(true);
    const [chatMessages, setChatMessages] = useState(true);

    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/notifications');
            const data = await res.json();
            if (res.ok) {
                setNotifications(data.data || []);
                const unread = data.data?.filter((n: any) => !n.read).length || 0;
                setUnreadCount(unread);
            } else {
                toast.error(data.error || 'Failed to fetch notifications');
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
            toast.error('Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const markAllAsRead = async () => {
        try {
            const res = await fetch('/api/notifications', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}), // Empty body implies mark all
            });

            if (res.ok) {
                toast.success('All notifications marked as read');
                // Optimistically update UI
                setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                setUnreadCount(0);
            } else {
                toast.error('Failed to mark notifications as read');
            }
        } catch (error) {
            console.error('Error marking notifications as read:', error);
            toast.error('Failed to mark notifications as read');
        }
    };

    const getIconForType = (type: string) => {
        switch (type) {
            case 'appointment_request':
            case 'appointment_confirmed':
                return { icon: Calendar, color: 'bg-blue-50 text-blue-600', iconColor: 'text-blue-600' };
            case 'payment_received':
            case 'payment_due':
                return { icon: DollarSign, color: 'bg-green-50 text-green-600', iconColor: 'text-green-600' };
            case 'message_received':
                return { icon: MessageSquare, color: 'bg-yellow-50 text-yellow-600', iconColor: 'text-yellow-600' };
            case 'case_assigned':
            case 'case_update':
                return { icon: Clock, color: 'bg-purple-50 text-purple-600', iconColor: 'text-purple-600' };
            case 'success':
                return { icon: CheckCircle, color: 'bg-gray-100 text-gray-600', iconColor: 'text-gray-600' };
            default:
                return { icon: Bell, color: 'bg-gray-100 text-gray-600', iconColor: 'text-gray-600' };
        }
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
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
                <div className="flex justify-between items-center">
                    <h2 className="text-lg text-muted-foreground">{unreadCount} unread notifications</h2>
                    <Button variant="outline" className="gap-2 text-sm h-9" onClick={markAllAsRead} disabled={unreadCount === 0}>
                        <CheckCircle className="h-4 w-4" /> Mark All as Read
                    </Button>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Notifications List */}
                    <div className="lg:col-span-2 space-y-4">
                        <Card className="p-6">
                            <div className="mb-6">
                                <h3 className="font-semibold">Recent Notifications</h3>
                                <p className="text-sm text-muted-foreground">Stay updated on your legal matters</p>
                            </div>

                            <div className="space-y-4">
                                {notifications.length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                        No notifications found.
                                    </div>
                                ) : (
                                    notifications.map((notif) => {
                                        const { icon: Icon, color, iconColor } = getIconForType(notif.type);
                                        return (
                                            <div key={notif._id} className={`bg-gray-50/50 rounded-lg p-4 border ${notif.read ? 'border-gray-100' : 'border-blue-200 bg-blue-50/30'} relative transition-colors`}>
                                                {!notif.read && (
                                                    <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-blue-600"></div>
                                                )}
                                                <div className="flex items-start gap-4">
                                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}>
                                                        <Icon className={`h-5 w-5 ${iconColor}`} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className={`font-semibold text-sm ${notif.read ? 'text-gray-900' : 'text-blue-900'}`}>{notif.type.replace(/_/g, ' ').toUpperCase()}</h4>
                                                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{notif.message}</p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <span className="text-xs text-muted-foreground">{formatTime(notif.createdAt)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Notification Settings */}
                    <div className="lg:col-span-1">
                        <Card className="p-6 sticky top-6">
                            <div className="mb-6">
                                <h3 className="font-semibold">Notification Settings</h3>
                                <p className="text-sm text-muted-foreground">Manage how you receive notifications</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Notification Channels</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                                                <p className="text-xs text-muted-foreground">Receive updates via email</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} className="sr-only peer" />
                                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gray-900"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">SMS Notifications</p>
                                                <p className="text-xs text-muted-foreground">Receive updates via SMS</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" checked={smsNotif} onChange={() => setSmsNotif(!smsNotif)} className="sr-only peer" />
                                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gray-900"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-4">
                                    <h4 className="text-sm font-medium text-gray-900 mb-3">Notification Types</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Appointment Reminders</p>
                                                <p className="text-xs text-muted-foreground">Upcoming appointment alerts</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" checked={apptReminders} onChange={() => setApptReminders(!apptReminders)} className="sr-only peer" />
                                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gray-900"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Payment Updates</p>
                                                <p className="text-xs text-muted-foreground">Payment confirmations and reminders</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" checked={paymentUpdates} onChange={() => setPaymentUpdates(!paymentUpdates)} className="sr-only peer" />
                                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gray-900"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Chat Messages</p>
                                                <p className="text-xs text-muted-foreground">New messages from lawyers</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" checked={chatMessages} onChange={() => setChatMessages(!chatMessages)} className="sr-only peer" />
                                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gray-900"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                                    Save Preferences
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
