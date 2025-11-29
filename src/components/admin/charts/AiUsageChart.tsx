'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

export function AiUsageChart() {
    const data = [
        { label: 'Legal Drafting', value: 1200, width: '85%' },
        { label: 'Case Analysis', value: 950, width: '68%' },
        { label: 'Law Lookup', value: 700, width: '50%' },
        { label: 'Predictions', value: 450, width: '32%' },
        { label: 'Counterarguments', value: 380, width: '27%' },
    ];

    return (
        <Card className="bg-white border-none shadow-sm p-6">
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900">AI Assistant Usage</h3>
                <p className="text-sm text-gray-500">Most used AI features</p>
            </div>

            <div className="space-y-4">
                {data.map((item) => (
                    <div key={item.label} className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-600 font-medium">{item.label}</span>
                            <span className="text-gray-500">{item.value}</span>
                        </div>
                        <div className="h-6 w-full bg-gray-50 rounded-sm overflow-hidden">
                            <div
                                className="h-full bg-[#1C2434] rounded-sm"
                                style={{ width: item.width }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between text-xs text-gray-400 mt-4 border-t border-gray-100 pt-2">
                <span>0</span>
                <span>350</span>
                <span>700</span>
                <span>1050</span>
                <span>1400</span>
            </div>
        </Card>
    );
}
