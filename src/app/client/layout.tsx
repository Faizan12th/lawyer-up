import React from 'react';
import { ClientSidebar } from '@/components/client/ClientSidebar';

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <ClientSidebar />
            <div className="pl-64">
                {children}
            </div>
        </div>
    );
}
