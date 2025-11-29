import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Lock, Shield, Key, Smartphone } from 'lucide-react';

export function SecuritySettings() {
    return (
        <div className="space-y-6">
            <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Lock className="h-5 w-5 text-gray-900" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Password & Authentication</h3>
                        <p className="text-sm text-muted-foreground">Manage your account security preferences</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                                <Key className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm">Password</h4>
                                <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">Change Password</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center">
                                <Smartphone className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <h4 className="font-medium text-sm">Two-Factor Authentication</h4>
                                <p className="text-xs text-green-600 font-medium">Enabled</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">Disable</Button>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-gray-900" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Active Sessions</h3>
                        <p className="text-sm text-muted-foreground">Manage devices logged into your account</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded bg-gray-100 flex items-center justify-center">
                                <span className="text-xs font-bold text-gray-600">Win</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Windows PC - Chrome</p>
                                <p className="text-xs text-muted-foreground">New York, USA • Active now</p>
                            </div>
                        </div>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Current</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded bg-gray-100 flex items-center justify-center">
                                <span className="text-xs font-bold text-gray-600">Mac</span>
                            </div>
                            <div>
                                <p className="text-sm font-medium">Macbook Pro - Safari</p>
                                <p className="text-xs text-muted-foreground">New York, USA • 2 hours ago</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">Revoke</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
