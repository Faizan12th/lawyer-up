'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Briefcase,
    Bot,
    Calendar,
    FileText,
    Bell,
    Star,
    Settings,
    LogOut,
    Scale,
    MessageSquare
} from 'lucide-react';

export const Sidebar: React.FC = () => {
    const pathname = usePathname();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/lawyer/dashboard' },
        { icon: Briefcase, label: 'My Cases', href: '/lawyer/cases' },
        { icon: Bot, label: 'AI Legal Assistant', href: '/lawyer/ai-assistant' },
        { icon: Calendar, label: 'Appointments', href: '/lawyer/appointments' },
        { icon: FileText, label: 'Documents', href: '/lawyer/documents' },
        { icon: MessageSquare, label: 'Messages', href: '/lawyer/chat' },
        { icon: Bell, label: 'Notifications', href: '/lawyer/notifications' },
        { icon: Star, label: 'Feedback & Reviews', href: '/lawyer/reviews' },
        { icon: Settings, label: 'Settings', href: '/lawyer/settings' },
    ];

    return (
        <aside className="h-screen w-64 border-r border-border bg-background">
            <div className="flex h-16 items-center gap-2 border-b border-border px-6">
                <Scale className="h-6 w-6" />
                <div className="flex flex-col">
                    <span className="font-bold leading-none">LawyerUP</span>
                    <span className="text-xs text-muted-foreground">Lawyer Portal</span>
                </div>
            </div>

            <div className="flex h-[calc(100vh-4rem)] flex-col justify-between py-4">
                <nav className="space-y-1 px-3">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                    }`}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-border px-3 pt-4">
                    <Link
                        href="/login"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </Link>
                </div>
            </div>
        </aside>
    );
};
