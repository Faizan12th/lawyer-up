import React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';

export default function LawyerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="ml-64 flex-1">
                {children}
            </main>
        </div>
    );
}
