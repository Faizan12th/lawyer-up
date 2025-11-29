'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    MessageSquare,
    BarChart3,
    Settings,
    LogOut,
    Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Case Oversight', href: '/admin/cases', icon: Briefcase },
    { name: 'Feedback Monitoring', href: '/admin/feedback', icon: MessageSquare },
    { name: 'System Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
            <div className="flex flex-col px-6 py-6 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                    <Shield className="h-6 w-6 text-gray-900" />
                    <span className="text-xl font-bold text-gray-900">LawyerUP</span>
                </div>
                <span className="text-xs text-gray-500 pl-8">Admin Portal</span>
            </div>

            <div className="flex-1 overflow-y-auto py-6">
                <nav className="space-y-1 px-4">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    'group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-gray-900 text-white'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        'mr-3 h-5 w-5 flex-shrink-0',
                                        isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                                    )}
                                />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="border-t border-gray-100 p-4">
                <Link
                    href="/login"
                    className="group flex items-center rounded-md px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="mr-3 h-5 w-5 text-red-600" />
                    Logout
                </Link>
            </div>
        </div>
    );
}
