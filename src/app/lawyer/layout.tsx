import React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';

import { MobileSidebar } from '@/components/ui/MobileSidebar';

export default function LawyerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex fixed left-0 top-0 h-full z-40">
                <Sidebar />
            </div>

            {/* Mobile Sidebar */}
            <div className="md:hidden">
                <MobileSidebar>
                    <Sidebar />
                </MobileSidebar>
            </div>

            <main className="flex-1 md:ml-64 w-full">
                {children}
            </main>
        </div>
    );
}
