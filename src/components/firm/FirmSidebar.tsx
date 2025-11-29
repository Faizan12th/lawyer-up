'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    DollarSign,
    Settings,
    LogOut,
    Building2
} from 'lucide-react';

export function FirmSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/firm/dashboard' },
        { icon: Users, label: 'Lawyer Management', href: '/firm/lawyers' },
        { icon: Briefcase, label: 'Case Assignment', href: '/firm/cases' },
        { icon: DollarSign, label: 'Centralized Billing', href: '/firm/billing' },
        { icon: Settings, label: 'Settings', href: '/firm/settings' },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
            <div className="p-6 border-b border-gray-100">
                <Link href="/firm/dashboard" className="flex items-center gap-2">
                    <Building2 className="h-8 w-8 text-gray-900" />
                    <div className="flex flex-col">
                        <span className="font-bold text-xl text-gray-900 leading-none">LawyerUP</span>
                        <span className="text-xs text-gray-500 font-medium">Firm Portal</span>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? 'bg-gray-900 text-white'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <Link
                    href="/login/firm"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="h-5 w-5" />
                    Logout
                </Link>
            </div>
        </aside>
    );
}
