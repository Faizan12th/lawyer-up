'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

export function RegionalDistChart() {
    return (
        <Card className="bg-white border-none shadow-sm p-6">
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900">Regional Distribution</h3>
                <p className="text-sm text-gray-500">Users by region</p>
            </div>

            <div className="flex items-center justify-center h-48 relative">
                {/* Pie Chart (CSS Conic Gradient) */}
                <div
                    className="w-40 h-40 rounded-full"
                    style={{
                        background: `conic-gradient(
                            #1C2434 0% 35%, 
                            #475569 35% 60%, 
                            #94A3B8 60% 80%, 
                            #CBD5E1 80% 100%
                        )`
                    }}
                />
                {/* Labels (Absolute positioning for demo visual match) */}
                <div className="absolute top-4 right-4 text-[10px] text-gray-500">Lahore (35%)</div>
                <div className="absolute bottom-10 left-4 text-[10px] text-gray-500">Karachi (25%)</div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#1C2434]" />
                    <span className="text-xs text-gray-600">Lahore: 3,245</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#475569]" />
                    <span className="text-xs text-gray-600">Karachi: 2,890</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#94A3B8]" />
                    <span className="text-xs text-gray-600">Islamabad: 1,650</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#CBD5E1]" />
                    <span className="text-xs text-gray-600">Other Cities: 1,470</span>
                </div>
            </div>
        </Card>
    );
}
