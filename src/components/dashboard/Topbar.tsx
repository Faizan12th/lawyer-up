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

            {/* Icons removed as per user request */}
            <div className="flex items-center gap-4">
                {/* Content removed */}
            </div>
        </header>
    );
};
