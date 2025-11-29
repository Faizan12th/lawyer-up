import React from 'react';
import { ClientSidebar } from '@/components/client/ClientSidebar';

import { MobileSidebar } from '@/components/ui/MobileSidebar';

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#FDFBF7]">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex fixed left-0 top-0 h-full">
                <ClientSidebar />
            </div>

            {/* Mobile Sidebar */}
            <div className="md:hidden">
                <MobileSidebar>
                    <ClientSidebar />
                </MobileSidebar>
            </div>

            <div className="flex-1 md:pl-64 w-full">
                {children}
            </div>
        </div>
    );
}
