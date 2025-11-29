'use client';

import React, { useState, useEffect } from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface TopbarProps {
    title: string;
    subtitle?: string;
}

export const Topbar: React.FC<TopbarProps> = ({ title, subtitle }) => {
    const router = useRouter();
    const [notifications, setNotifications] = useState<any[]>([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await fetch('/api/notifications');
                const data = await res.json();
                if (res.ok) {
                    setNotifications(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch notifications', error);
            }
        };
        fetchNotifications();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
        } catch (error) {
            console.error('Failed to logout', error);
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6 relative z-20">
            <div>
                <h1 className="text-lg font-semibold text-foreground">{title}</h1>
                {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>

            <div className="flex items-center gap-4">
                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-80 rounded-md border border-border bg-background shadow-lg py-1">
                            <div className="px-4 py-2 border-b border-border">
                                <h3 className="text-sm font-semibold">Notifications</h3>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map((notification) => (
                                        <div key={notification._id} className={`px-4 py-3 hover:bg-accent/50 cursor-pointer ${!notification.read ? 'bg-blue-50/50' : ''}`}>
                                            <p className="text-sm font-medium">{notification.title}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                                            <p className="text-[10px] text-muted-foreground mt-2 text-right">{new Date(notification.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                                        No notifications
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="h-8 w-px bg-border"></div>

                {/* User Menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="flex items-center gap-2 rounded-full p-1 hover:bg-accent"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                            <User className="h-4 w-4 text-gray-600" />
                        </div>
                    </button>

                    {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-background shadow-lg py-1">
                            <Link href="/client/settings" className="block px-4 py-2 text-sm text-foreground hover:bg-accent">
                                Settings
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
