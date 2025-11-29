'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Settings, Shield, Bell, User, Server, Database, Save, Lock } from 'lucide-react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<'System' | 'Platform' | 'Notifications' | 'Security' | 'Admin Profile'>('System');

    // Mock State for Toggles
    const [toggles, setToggles] = useState({
        maintenanceMode: false,
        newUserRegistrations: true,
        autoVerifyLawyers: false,
        enableAiAssistant: true,
        emailNotifications: true,
        smsNotifications: false,
        notifyRegistrations: true,
        notifyCaseAlerts: true,
        notifySystemAlerts: true,
        require2FA: false,
        loginAttemptLimit: true,
    });

    const handleToggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'System':
                return (
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                                <Settings className="h-5 w-5" /> System Configuration
                            </h3>
                            <p className="text-sm text-gray-500">Manage platform-wide settings</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Platform Name</label>
                                <input type="text" defaultValue="LawyerUP" className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-gray-900 focus:border-gray-900" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Support Email</label>
                                <input type="email" defaultValue="support@lawyerup.com" className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-gray-900 focus:border-gray-900" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Support Phone</label>
                                <input type="text" defaultValue="+92 300 1234567" className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-gray-900 focus:border-gray-900" />
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">Maintenance Mode</h4>
                                    <p className="text-xs text-gray-500">Temporarily disable platform access</p>
                                </div>
                                <button
                                    onClick={() => handleToggle('maintenanceMode')}
                                    className={`w-11 h-6 flex items-center rounded-full transition-colors ${toggles.maintenanceMode ? 'bg-[#1C2434]' : 'bg-gray-200'}`}
                                >
                                    <span className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${toggles.maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">New User Registrations</h4>
                                    <p className="text-xs text-gray-500">Allow new users to sign up</p>
                                </div>
                                <button
                                    onClick={() => handleToggle('newUserRegistrations')}
                                    className={`w-11 h-6 flex items-center rounded-full transition-colors ${toggles.newUserRegistrations ? 'bg-[#1C2434]' : 'bg-gray-200'}`}
                                >
                                    <span className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${toggles.newUserRegistrations ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">Auto-verify Lawyers</h4>
                                    <p className="text-xs text-gray-500">Automatically verify lawyer credentials</p>
                                </div>
                                <button
                                    onClick={() => handleToggle('autoVerifyLawyers')}
                                    className={`w-11 h-6 flex items-center rounded-full transition-colors ${toggles.autoVerifyLawyers ? 'bg-[#1C2434]' : 'bg-gray-200'}`}
                                >
                                    <span className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${toggles.autoVerifyLawyers ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button className="bg-[#1C2434] hover:bg-[#2C3A4F] text-white">
                                <Save className="h-4 w-4 mr-2" /> Save System Settings
                            </Button>
                        </div>
                    </div>
                );
            case 'Platform':
                return (
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-1">
                                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                                    <Database className="h-5 w-5" /> Platform Configuration
                                </h3>
                                <p className="text-sm text-gray-500">Configure platform features and limits</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Max Cases per Lawyer</label>
                                    <input type="number" defaultValue="20" className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-gray-900 focus:border-gray-900" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Platform Service Fee (%)</label>
                                    <input type="number" defaultValue="5" className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-gray-900 focus:border-gray-900" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
                                    <input type="number" defaultValue="30" className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-gray-900 focus:border-gray-900" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Max Upload Size (MB)</label>
                                    <input type="number" defaultValue="10" className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-gray-900 focus:border-gray-900" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Allowed File Types</label>
                                <input type="text" defaultValue="pdf, doc, docx, jpg, png" className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-gray-900 focus:border-gray-900" />
                            </div>

                            <div className="flex justify-end">
                                <Button className="bg-[#1C2434] hover:bg-[#2C3A4F] text-white">
                                    <Save className="h-4 w-4 mr-2" /> Update Platform Settings
                                </Button>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 space-y-6">
                            <div className="space-y-1">
                                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                                    <Server className="h-5 w-5" /> AI Assistant Configuration
                                </h3>
                                <p className="text-sm text-gray-500">Configure AI legal assistant settings</p>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">Enable AI Assistant</h4>
                                    <p className="text-xs text-gray-500">Allow lawyers to use AI legal assistant</p>
                                </div>
                                <button
                                    onClick={() => handleToggle('enableAiAssistant')}
                                    className={`w-11 h-6 flex items-center rounded-full transition-colors ${toggles.enableAiAssistant ? 'bg-[#1C2434]' : 'bg-gray-200'}`}
                                >
                                    <span className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${toggles.enableAiAssistant ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">AI Query Rate Limit (per day)</label>
                                <input type="number" defaultValue="50" className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-gray-900 focus:border-gray-900" />
                            </div>

                            <div className="flex justify-end">
                                <Button className="bg-[#1C2434] hover:bg-[#2C3A4F] text-white">
                                    <Save className="h-4 w-4 mr-2" /> Save AI Settings
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            case 'Notifications':
                return (
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                                <Bell className="h-5 w-5" /> Admin Notification Preferences
                            </h3>
                            <p className="text-sm text-gray-500">Manage admin notification settings</p>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-sm font-medium text-gray-900">Notification Channels</h4>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                                        <p className="text-xs text-gray-500">Receive updates via email</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggle('emailNotifications')}
                                        className={`w-11 h-6 flex items-center rounded-full transition-colors ${toggles.emailNotifications ? 'bg-[#1C2434]' : 'bg-gray-200'}`}
                                    >
                                        <span className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${toggles.emailNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">SMS Notifications</p>
                                        <p className="text-xs text-gray-500">Receive critical alerts via SMS</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggle('smsNotifications')}
                                        className={`w-11 h-6 flex items-center rounded-full transition-colors ${toggles.smsNotifications ? 'bg-[#1C2434]' : 'bg-gray-200'}`}
                                    >
                                        <span className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${toggles.smsNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            </div>

                            <h4 className="text-sm font-medium text-gray-900 pt-4 border-t border-gray-100">Notification Types</h4>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">User Registrations</p>
                                        <p className="text-xs text-gray-500">New user sign-ups and verifications</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggle('notifyRegistrations')}
                                        className={`w-11 h-6 flex items-center rounded-full transition-colors ${toggles.notifyRegistrations ? 'bg-[#1C2434]' : 'bg-gray-200'}`}
                                    >
                                        <span className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${toggles.notifyRegistrations ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Case Alerts</p>
                                        <p className="text-xs text-gray-500">Critical case updates and disputes</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggle('notifyCaseAlerts')}
                                        className={`w-11 h-6 flex items-center rounded-full transition-colors ${toggles.notifyCaseAlerts ? 'bg-[#1C2434]' : 'bg-gray-200'}`}
                                    >
                                        <span className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${toggles.notifyCaseAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">System Alerts</p>
                                        <p className="text-xs text-gray-500">System errors and performance issues</p>
                                    </div>
                                    <button
                                        onClick={() => handleToggle('notifySystemAlerts')}
                                        className={`w-11 h-6 flex items-center rounded-full transition-colors ${toggles.notifySystemAlerts ? 'bg-[#1C2434]' : 'bg-gray-200'}`}
                                    >
                                        <span className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${toggles.notifySystemAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button className="bg-[#1C2434] hover:bg-[#2C3A4F] text-white">
                                <Save className="h-4 w-4 mr-2" /> Save Preferences
                            </Button>
                        </div>
                    </div>
                );
            case 'Security':
                return (
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-1">
                                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                                    <Lock className="h-5 w-5" /> Security Settings
                                </h3>
                                <p className="text-sm text-gray-500">Manage platform security</p>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Current Password</label>
                                    <input type="password" className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-gray-900 focus:border-gray-900" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">New Password</label>
                                    <input type="password" className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-gray-900 focus:border-gray-900" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                                    <input type="password" className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-gray-900 focus:border-gray-900" />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button className="bg-[#1C2434] hover:bg-[#2C3A4F] text-white">
                                    <Save className="h-4 w-4 mr-2" /> Change Password
                                </Button>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 space-y-6">
                            <div className="space-y-1">
                                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                                    <Shield className="h-5 w-5" /> Platform Security
                                </h3>
                                <p className="text-sm text-gray-500">Configure security policies</p>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">Require 2FA for All Users</h4>
                                    <p className="text-xs text-gray-500">Enforce two-factor authentication</p>
                                </div>
                                <button
                                    onClick={() => handleToggle('require2FA')}
                                    className={`w-11 h-6 flex items-center rounded-full transition-colors ${toggles.require2FA ? 'bg-[#1C2434]' : 'bg-gray-200'}`}
                                >
                                    <span className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${toggles.require2FA ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-900">Login Attempt Limit</h4>
                                    <p className="text-xs text-gray-500">Lock account after failed attempts</p>
                                </div>
                                <button
                                    onClick={() => handleToggle('loginAttemptLimit')}
                                    className={`w-11 h-6 flex items-center rounded-full transition-colors ${toggles.loginAttemptLimit ? 'bg-[#1C2434]' : 'bg-gray-200'}`}
                                >
                                    <span className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${toggles.loginAttemptLimit ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Max Login Attempts</label>
                                <input type="number" defaultValue="5" className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-gray-900 focus:border-gray-900" />
                            </div>

                            <div className="flex justify-end">
                                <Button className="bg-[#1C2434] hover:bg-[#2C3A4F] text-white">
                                    <Save className="h-4 w-4 mr-2" /> Update Security Settings
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            case 'Admin Profile':
                return (
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                                <User className="h-5 w-5" /> Admin Profile
                            </h3>
                            <p className="text-sm text-gray-500">Manage your admin account details</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Full Name *</label>
                                <input type="text" defaultValue="Admin User" className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-gray-900 focus:border-gray-900" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Email Address *</label>
                                <input type="email" defaultValue="admin@lawyerup.com" className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-gray-900 focus:border-gray-900" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                <input type="text" defaultValue="+92 300 1234567" className="w-full p-2 border border-gray-200 rounded-md text-sm focus:ring-gray-900 focus:border-gray-900" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Role</label>
                                <div className="w-full p-2 border border-gray-200 rounded-md text-sm bg-gray-50 text-gray-500 flex justify-between items-center">
                                    <span>Super Admin</span>
                                    <span className="text-xs text-gray-400">Read-only</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button className="bg-[#1C2434] hover:bg-[#2C3A4F] text-white">
                                <Save className="h-4 w-4 mr-2" /> Update Profile
                            </Button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {/* Tabs Navigation */}
            <div className="bg-gray-100 p-1 rounded-lg flex overflow-x-auto">
                {['System', 'Platform', 'Notifications', 'Security', 'Admin Profile'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-all ${activeTab === tab
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Card */}
            <Card className="bg-white border-none shadow-sm p-6">
                {renderTabContent()}
            </Card>
        </div>
    );
}
