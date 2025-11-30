'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

export function ActiveUsersChart({ active, total, trend }: { active?: number, total?: number, trend?: any[] }) {
    const defaultTrend = [
        { month: 'Apr', clients: 0, lawyers: 0 },
        { month: 'May', clients: 0, lawyers: 0 },
        { month: 'Jun', clients: 0, lawyers: 0 },
        { month: 'Jul', clients: 0, lawyers: 0 },
        { month: 'Aug', clients: 0, lawyers: 0 },
        { month: 'Sep', clients: 0, lawyers: 0 },
    ];

    const data = trend && trend.length > 0 ? trend : defaultTrend;

    const maxVal = Math.max(
        ...data.map((d: any) => Math.max(d.clients, d.lawyers)),
        10
    ) * 1.2;
    const width = 100; // percent
    const height = 100; // percent

    // Helper to create points for SVG polyline
    const createPoints = (key: 'clients' | 'lawyers') => {
        return data.map((item, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - (item[key] / maxVal) * 100;
            return `${x},${y}`;
        }).join(' ');
    };

    return (
        <Card className="p-6 bg-white border-none shadow-sm">
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
                <p className="text-sm text-gray-500">Monthly active users trend</p>
            </div>

            <div className="relative h-64 w-full">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between text-xs text-gray-400 z-0">
                    {[6000, 4500, 3000, 1500, 0].map((val) => (
                        <div key={val} className="flex items-center w-full">
                            <span className="w-8 text-right mr-2">{val}</span>
                            <div className="flex-1 border-t border-dashed border-gray-200"></div>
                        </div>
                    ))}
                </div>

                {/* Chart Area */}
                <div className="absolute inset-0 pl-10 pr-4 pb-6 pt-2 z-10">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                        {/* Clients Line */}
                        <polyline
                            points={createPoints('clients')}
                            fill="none"
                            stroke="#6B7280"
                            strokeWidth="2"
                            vectorEffect="non-scaling-stroke"
                        />
                        {/* Lawyers Line */}
                        <polyline
                            points={createPoints('lawyers')}
                            fill="none"
                            stroke="#1F2937"
                            strokeWidth="2"
                            vectorEffect="non-scaling-stroke"
                        />

                        {/* Dots */}
                        {data.map((item, index) => {
                            const x = (index / (data.length - 1)) * 100;
                            const yClients = 100 - (item.clients / maxVal) * 100;
                            const yLawyers = 100 - (item.lawyers / maxVal) * 100;
                            return (
                                <g key={index}>
                                    <circle cx={x} cy={yClients} r="1.5" fill="white" stroke="#6B7280" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                                    <circle cx={x} cy={yLawyers} r="1.5" fill="white" stroke="#1F2937" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
                                </g>
                            );
                        })}
                    </svg>

                    {/* X Axis Labels */}
                    <div className="flex justify-between mt-2">
                        {data.map((item, index) => (
                            <span key={index} className="text-xs text-gray-500 w-full text-center" style={{ width: '0' }}>{item.month}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full border-2 border-gray-500 bg-white"></div>
                        <div className="w-4 h-0.5 bg-gray-500"></div>
                    </div>
                    <span className="text-sm text-gray-600">Clients</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full border-2 border-gray-900 bg-white"></div>
                        <div className="w-4 h-0.5 bg-gray-900"></div>
                    </div>
                    <span className="text-sm text-gray-600">Lawyers</span>
                </div>
            </div>
        </Card>
    );
}
