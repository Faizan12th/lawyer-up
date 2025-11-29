import React from 'react';
import { FirmSidebar } from '@/components/firm/FirmSidebar';

export default function FirmLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#FDFBF7]">
            <FirmSidebar />
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
