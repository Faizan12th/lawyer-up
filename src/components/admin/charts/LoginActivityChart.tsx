'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

export function LoginActivityChart() {
    return (
        <Card className="bg-white border-none shadow-sm p-6">
            <div className="mb-6">
                <h3 className="font-semibold text-gray-900">Login Activity</h3>
                <p className="text-sm text-gray-500">User login trends by role</p>
            </div>

            <div className="h-64 w-full relative">
                {/* Y-Axis Labels */}
                <div className="absolute left-0 top-0 bottom-8 w-8 flex flex-col justify-between text-xs text-gray-400">
                    <span>600</span>
                    <span>450</span>
                    <span>300</span>
                    <span>150</span>
                    <span>0</span>
                </div>

                {/* Chart Area */}
                <div className="absolute left-10 right-0 top-2 bottom-8">
                    {/* Grid Lines */}
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="absolute w-full border-t border-gray-100 border-dashed" style={{ top: `${i * 25}%` }} />
                    ))}

                    {/* Lines (SVG) */}
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                        {/* Lawyers Line (Dark) */}
                        <path
                            d="M0,75 C50,73 100,70 150,65 C200,60 250,55 300,50 C350,45 400,40 450,35 C500,30 550,25 600,20"
                            fill="none"
                            stroke="#1C2434"
                            strokeWidth="2"
                            vectorEffect="non-scaling-stroke"
                        />
                        {/* Clients Line (Gray) */}
                        <path
                            d="M0,40 C50,38 100,35 150,32 C200,30 250,28 300,25 C350,22 400,20 450,18 C500,15 550,12 600,10"
                            fill="none"
                            stroke="#94A3B8"
                            strokeWidth="2"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>

                    {/* Points */}
                    <div className="absolute top-[20%] right-0 h-2 w-2 rounded-full bg-white border-2 border-[#1C2434]" />
                    <div className="absolute top-[10%] right-0 h-2 w-2 rounded-full bg-white border-2 border-[#94A3B8]" />
                </div>

                {/* X-Axis Labels */}
                <div className="absolute left-10 right-0 bottom-0 flex justify-between text-xs text-gray-400">
                    <span>Oct 1</span>
                    <span>Oct 3</span>
                    <span>Oct 5</span>
                    <span>Oct 7</span>
                    <span>Oct 9</span>
                    <span>Oct 11</span>
                </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#1C2434]" />
                    <span className="text-xs text-gray-600">Lawyers</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#94A3B8]" />
                    <span className="text-xs text-gray-600">Clients</span>
                </div>
            </div>
        </Card>
    );
}
