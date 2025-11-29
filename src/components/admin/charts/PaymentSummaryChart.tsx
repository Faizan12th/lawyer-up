'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

export function PaymentSummaryChart() {
    const data = [
        { month: 'May', value: 700, height: '35%' },
        { month: 'Jun', value: 900, height: '45%' },
        { month: 'Jul', value: 1100, height: '55%' },
        { month: 'Aug', value: 1400, height: '70%' },
        { month: 'Sep', value: 1600, height: '80%' },
        { month: 'Oct', value: 1800, height: '90%' },
    ];

    return (
        <Card className="bg-white border-none shadow-sm p-6">
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900">Payment Summary (PKR Thousands)</h3>
                <p className="text-sm text-gray-500">Monthly transaction volume</p>
            </div>

            <div className="h-64 w-full relative">
                {/* Y-Axis Labels */}
                <div className="absolute left-0 top-0 bottom-8 w-8 flex flex-col justify-between text-xs text-gray-400">
                    <span>2400</span>
                    <span>1800</span>
                    <span>1200</span>
                    <span>600</span>
                    <span>0</span>
                </div>

                {/* Chart Area */}
                <div className="absolute left-10 right-0 top-2 bottom-8 flex items-end justify-between px-4">
                    {/* Grid Lines */}
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="absolute left-0 right-0 border-t border-gray-100 border-dashed" style={{ top: `${i * 25}%` }} />
                    ))}

                    {/* Bars */}
                    {data.map((item) => (
                        <div key={item.month} className="w-12 bg-[#1C2434] rounded-t-sm relative group z-10" style={{ height: item.height }}>
                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                                PKR {item.value}k
                            </div>
                        </div>
                    ))}
                </div>

                {/* X-Axis Labels */}
                <div className="absolute left-10 right-0 bottom-0 flex justify-between px-6 text-xs text-gray-400">
                    {data.map((item) => (
                        <span key={item.month}>{item.month}</span>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#1C2434] rounded-sm" />
                    <span className="text-xs text-gray-600">Amount (PKR K)</span>
                </div>
            </div>
        </Card>
    );
}
