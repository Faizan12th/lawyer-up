'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

export function TransactionsChart() {
    const data = [
        { month: 'Apr', value: 1200 },
        { month: 'May', value: 1600 },
        { month: 'Jun', value: 1900 },
        { month: 'Jul', value: 2400 },
        { month: 'Aug', value: 2800 },
        { month: 'Sep', value: 3300 },
        { month: 'Oct', value: 3900 },
    ];

    const maxVal = 4000;

    return (
        <Card className="p-6 bg-white border-none shadow-sm">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Transactions (PKR thousands)</h3>
                <p className="text-sm text-gray-500">Monthly platform transactions</p>
            </div>

            <div className="relative h-64 w-full">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-400">
                    {[4000, 3000, 2000, 1000, 0].map((val) => (
                        <div key={val} className="flex items-center w-full">
                            <span className="w-8 text-right mr-2">{val}</span>
                            <div className="flex-1 border-t border-dashed border-gray-200"></div>
                        </div>
                    ))}
                </div>

                {/* Bars */}
                <div className="absolute inset-0 flex items-end justify-between pl-10 pr-4 pb-6 pt-2">
                    {data.map((item, index) => (
                        <div key={index} className="flex flex-col items-center gap-1 w-full px-2">
                            <div
                                className="w-full max-w-[60px] bg-[#1C2434] rounded-t-sm hover:bg-[#2C3444] transition-colors"
                                style={{ height: `${(item.value / maxVal) * 100}%` }}
                            ></div>
                            <span className="text-xs text-gray-500 mt-2">{item.month}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}
