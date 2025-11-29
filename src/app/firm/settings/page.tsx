'use client';

import React, { useState } from 'react';
import { Topbar } from '@/components/dashboard/Topbar';
import { FirmProfileSettings } from '@/components/firm/settings/FirmProfileSettings';
import { SecuritySettings } from '@/components/firm/settings/SecuritySettings';
import { BillingSettings } from '@/components/firm/settings/BillingSettings';
import { NotificationSettings } from '@/components/firm/settings/NotificationSettings';
import { Building2, Lock, Bell, CreditCard } from 'lucide-react';

export default function FirmSettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = [
        { id: 'profile', label: 'Firm Profile', icon: Building2 },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'billing', label: 'Billing', icon: CreditCard },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 pb-8">
            <Topbar title="Settings" subtitle="Legal Partners LLP" />

            <div className="px-6 py-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar Navigation */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg border p-2 space-y-1 sticky top-24">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${isActive
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1">
                        {activeTab === 'profile' && <FirmProfileSettings />}
                        {activeTab === 'security' && <SecuritySettings />}
                        {activeTab === 'notifications' && <NotificationSettings />}
                        {activeTab === 'billing' && <BillingSettings />}
                    </div>
                </div>
            </div>
        </div>
    );
}
