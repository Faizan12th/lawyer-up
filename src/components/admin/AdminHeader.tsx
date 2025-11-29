'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Bell, User } from 'lucide-react';

export function AdminHeader() {
    const pathname = usePathname();

    const getPageTitle = () => {
        if (pathname.includes('/admin/users')) return 'User Management';
        if (pathname.includes('/admin/cases')) return 'Case Oversight';
        if (pathname.includes('/admin/feedback')) return 'Feedback Monitoring';
        if (pathname.includes('/admin/analytics')) return 'System Analytics';
        if (pathname.includes('/admin/settings')) return 'Settings';
        return 'Admin Dashboard';
    };

    return (
        <header className="flex h-20 flex-shrink-0 items-center justify-between bg-white px-8 border-b border-gray-200">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
                <p className="text-sm text-gray-500">Platform Administration</p>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100">
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
                </button>

                <button className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <User className="h-5 w-5 text-gray-600" />
                </button>
            </div>
        </header>
    );
}
