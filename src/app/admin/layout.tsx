import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
// import { AdminHeader } from '@/components/admin/AdminHeader';
import { MobileSidebar } from '@/components/ui/MobileSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-[#F5F5F0]">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex">
                <AdminSidebar />
            </div>

            {/* Mobile Sidebar */}
            <div className="md:hidden">
                <MobileSidebar>
                    <AdminSidebar />
                </MobileSidebar>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden">
                {/* AdminHeader removed as per user request */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
