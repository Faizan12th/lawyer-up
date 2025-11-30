'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

export function RegistrationsChart({ data }: { data?: any[] }) {
    // Default data if none provided
    const defaultData = [
        { month: 'Apr', clients: 0, firms: 0, lawyers: 0 },
        { month: 'May', clients: 0, firms: 0, lawyers: 0 },
        { month: 'Jun', clients: 0, firms: 0, lawyers: 0 },
        { month: 'Jul', clients: 0, firms: 0, lawyers: 0 },
        { month: 'Aug', clients: 0, firms: 0, lawyers: 0 },
        { month: 'Sep', clients: 0, firms: 0, lawyers: 0 },
    ];

    const chartData = data && data.length > 0 ? data : defaultData;

    // Calculate max value dynamically or use default
    const maxVal = Math.max(
        ...chartData.map((d: any) => Math.max(d.clients, d.firms, d.lawyers)),
        10 // Minimum max value to avoid division by zero
    ) * 1.2; // Add 20% buffer

    return (
        <Card className="p-6 bg-white border-none shadow-sm">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Monthly Registrations</h3>
                <p className="text-sm text-gray-500">New user registrations by role</p>
            </div>

            <div className="relative h-64 w-full">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-400">
                    {[600, 450, 300, 150, 0].map((val) => (
                        <div key={val} className="flex items-center w-full">
                            <span className="w-8 text-right mr-2">{val}</span>
                            <div className="flex-1 border-t border-dashed border-gray-200"></div>
                        </div>
                    ))}
                </div>

                {/* Bars */}
                <div className="absolute inset-0 flex items-end justify-between pl-10 pr-4 pb-6 pt-2">
                    {chartData.map((item: any, index: number) => (
                        <div key={index} className="flex flex-col items-center gap-1 w-full">
                            <div className="flex items-end gap-1 h-full">
                                <div
                                    className="w-2 bg-gray-400 rounded-t-sm"
                                    style={{ height: `${(item.clients / maxVal) * 100}%` }}
                                ></div>
                                <div
                                    className="w-2 bg-gray-300 rounded-t-sm"
                                    style={{ height: `${(item.firms / maxVal) * 100}%` }}
                                ></div>
                                <div
                                    className="w-2 bg-gray-700 rounded-t-sm"
                                    style={{ height: `${(item.lawyers / maxVal) * 100}%` }}
                                ></div>
                            </div>
                            <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                    <span className="text-sm text-gray-600">Clients</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-sm"></div>
                    <span className="text-sm text-gray-600">Firms</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-700 rounded-sm"></div>
                    <span className="text-sm text-gray-600">Lawyers</span>
                </div>
            </div>
        </Card>
    );
}
