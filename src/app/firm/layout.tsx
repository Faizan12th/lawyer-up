import React from 'react';
import { FirmSidebar } from '@/components/firm/FirmSidebar';

import { MobileSidebar } from '@/components/ui/MobileSidebar';

export default function FirmLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#FDFBF7]">
            {/* Desktop Sidebar */}
            <div className="hidden md:flex h-screen sticky top-0">
                <FirmSidebar />
            </div>

            {/* Mobile Sidebar */}
            <div className="md:hidden">
                <MobileSidebar>
                    <FirmSidebar />
                </MobileSidebar>
            </div>

            <main className="flex-1 w-full">
                {children}
            </main>
        </div>
    );
}
