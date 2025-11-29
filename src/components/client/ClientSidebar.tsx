'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Search,
    Calendar,
    MessageSquare,
    CreditCard,
    HelpCircle,
    Bell,
    Settings,
    LogOut,
    Scale
} from 'lucide-react';

export function ClientSidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/client/dashboard' },
        { icon: Search, label: 'Find a Lawyer', href: '/client/find-lawyer' },
        { icon: Calendar, label: 'My Appointments', href: '/client/appointments' },
        { icon: MessageSquare, label: 'Chat Consultation', href: '/client/chat' },
        { icon: CreditCard, label: 'Payment & Billing', href: '/client/billing' },
        { icon: HelpCircle, label: 'Legal Support', href: '/client/support' },
        { icon: Bell, label: 'Notifications', href: '/client/notifications' },
        { icon: Settings, label: 'Settings', href: '/client/settings' },
    ];

    return (
        <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0">
            <div className="p-6 border-b border-gray-100">
                <Link href="/" className="flex items-center gap-2">
                    <Scale className="h-8 w-8 text-gray-900" />
                    <div className="flex flex-col">
                        <span className="font-bold text-xl text-gray-900 leading-none">LawyerUP</span>
                        <span className="text-xs text-gray-500">Client Portal</span>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(item.href)
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <item.icon className={`h-5 w-5 ${isActive(item.href) ? 'text-white' : 'text-gray-500'}`} />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <Link
                    href="/logout"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    Logout
                </Link>
            </div>
        </div>
    );
}
