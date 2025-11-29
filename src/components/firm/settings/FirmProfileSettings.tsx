import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Building2, Upload } from 'lucide-react';

export function FirmProfileSettings() {
    return (
        <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-gray-900" />
                </div>
                <div>
                    <h3 className="font-semibold">Firm Profile</h3>
                    <p className="text-sm text-muted-foreground">Manage firm details and public information</p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-6">
                    <div className="h-24 w-24 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <Building2 className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                        <h4 className="text-sm font-medium mb-1">Firm Logo</h4>
                        <p className="text-xs text-muted-foreground mb-3">Recommended size: 512x512px</p>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Upload className="h-3 w-3" />
                            Upload New Logo
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Firm Name</label>
                        <input type="text" defaultValue="Legal Partners LLP" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Registration Number</label>
                        <input type="text" defaultValue="REG-2020-8899" className="w-full px-3 py-2 border rounded-md text-sm bg-gray-50 text-gray-500" disabled />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Official Email</label>
                        <input type="email" defaultValue="contact@legalpartners.com" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        <input type="tel" defaultValue="+1 (555) 000-0000" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">Address</label>
                        <input type="text" defaultValue="123 Legal Avenue, Suite 100, New York, NY 10001" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">Website</label>
                        <input type="url" defaultValue="https://www.legalpartners.com" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900" />
                    </div>
                </div>

                <div className="pt-4 border-t flex justify-end">
                    <Button className="bg-gray-900 text-white hover:bg-gray-800">Save Changes</Button>
                </div>
            </div>
        </Card>
    );
}
