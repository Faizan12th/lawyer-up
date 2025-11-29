'use client';

import React from 'react';
import { FirmRegistrationForm } from '@/components/auth/FirmRegistrationForm';
import Link from 'next/link';
import { Scale } from 'lucide-react';

export default function FirmRegistrationPage() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
            {/* Header */}
            <header className="px-6 py-4 flex justify-between items-center border-b border-gray-100 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-2">
                    <Scale className="h-8 w-8 text-gray-900" />
                    <div className="flex flex-col">
                        <span className="font-bold text-xl text-gray-900 leading-none">LawyerUP</span>
                    </div>
                </Link>
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                    Sign In
                </Link>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-6">
                <FirmRegistrationForm />
            </main>
        </div>
    );
}
