'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { CreditCard } from 'lucide-react';

export function PaymentSettings() {
    return (
        <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center gap-4 mb-8">
                <CreditCard className="h-5 w-5 text-gray-900" />
                <div>
                    <h3 className="font-semibold text-lg">Payment Methods</h3>
                    <p className="text-sm text-muted-foreground">Manage your payment methods</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-16 bg-gray-100 rounded flex items-center justify-center">
                            <CreditCard className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">Visa ending in 4242</p>
                            <p className="text-xs text-muted-foreground">Expires 12/25</p>
                        </div>
                    </div>
                    <button className="text-sm text-red-600 hover:underline font-medium">
                        Remove
                    </button>
                </div>

                <Button variant="outline" className="mt-4">
                    Add Payment Method
                </Button>
            </div>
        </div>
    );
}
