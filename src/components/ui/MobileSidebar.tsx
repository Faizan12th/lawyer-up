'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { usePathname } from 'next/navigation';

interface MobileSidebarProps {
    children: React.ReactNode;
}

export function MobileSidebar({ children }: MobileSidebarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Close sidebar when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent scrolling when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/* Trigger Button */}
            <Button
                variant="ghost"
                size="sm"
                className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200"
                onClick={() => setIsOpen(true)}
            >
                <Menu className="h-6 w-6 text-gray-900" />
            </Button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[60] md:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Drawer */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white z-[70] transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="relative h-full">
                    {/* Close Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-4 right-4 z-50 p-2"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="h-5 w-5 text-gray-500" />
                    </Button>

                    {/* Content */}
                    <div className="h-full overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
