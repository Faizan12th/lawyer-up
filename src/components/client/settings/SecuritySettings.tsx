'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Lock, Shield } from 'lucide-react';

export function SecuritySettings() {
    const [twoFactor, setTwoFactor] = useState(false);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center gap-4 mb-8">
                    <Lock className="h-5 w-5 text-gray-900" />
                    <div>
                        <h3 className="font-semibold text-lg">Security Settings</h3>
                        <p className="text-sm text-muted-foreground">Manage your account security</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Current Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">New Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Confirm New Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-8">
                    <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                        Change Password
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold">Two-Factor Authentication</h3>
                        <p className="text-sm text-muted-foreground mt-1">Add an extra layer of security</p>

                        <div className="mt-4">
                            <p className="text-sm font-medium">Enable 2FA</p>
                            <p className="text-xs text-muted-foreground">Require a verification code when signing in</p>
                        </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer mt-8">
                        <input type="checkbox" checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                    </label>
                </div>
            </div>
        </div>
    );
}
