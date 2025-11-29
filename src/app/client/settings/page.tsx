'use client';

import React, { useState } from 'react';
// import { Topbar } from '@/components/dashboard/Topbar';
import { ProfileSettings } from '@/components/client/settings/ProfileSettings';
import { NotificationSettings } from '@/components/client/settings/NotificationSettings';
import { SecuritySettings } from '@/components/client/settings/SecuritySettings';
import { PaymentSettings } from '@/components/client/settings/PaymentSettings';

export default function ClientSettingsPage() {
    const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'payment'>('profile');

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'notifications', label: 'Notifications' },
        { id: 'security', label: 'Security' },
        { id: 'payment', label: 'Payment' },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 pb-8">
            {/* Topbar removed */}

            <div className="px-6 py-6 space-y-6">
                {/* Tabs */}
                <div className="bg-gray-200/50 p-1 rounded-lg flex gap-1 mb-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === tab.id
                                ? 'bg-white shadow-sm text-gray-900'
                                : 'text-gray-600 hover:bg-white/50'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto">
                    {activeTab === 'profile' && <ProfileSettings />}
                    {activeTab === 'notifications' && <NotificationSettings />}
                    {activeTab === 'security' && <SecuritySettings />}
                    {activeTab === 'payment' && <PaymentSettings />}
                </div>
            </div>
        </div>
    );
}
