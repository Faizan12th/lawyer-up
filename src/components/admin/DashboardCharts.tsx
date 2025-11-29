'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

export function DashboardCharts() {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">User Growth</h3>
                <div className="h-64 flex items-end justify-between gap-2 px-2">
                    {[40, 60, 45, 70, 85, 65, 90].map((height, i) => (
                        <div key={i} className="w-full bg-blue-100 rounded-t-md relative group">
                            <div
                                className="absolute bottom-0 w-full bg-blue-500 rounded-t-md transition-all duration-500 group-hover:bg-blue-600"
                                style={{ height: `${height}%` }}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">User Distribution</h3>
                <div className="h-64 flex items-center justify-center">
                    <div className="relative h-48 w-48 rounded-full border-8 border-gray-100">
                        <div className="absolute inset-0 rounded-full border-8 border-blue-500 border-r-transparent border-b-transparent rotate-45" />
                        <div className="absolute inset-0 rounded-full border-8 border-green-500 border-l-transparent border-t-transparent border-r-transparent -rotate-12" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold">2.4k</span>
                            <span className="text-sm text-gray-500">Total Users</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span>Clients</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span>Lawyers</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-200" />
                        <span>Firms</span>
                    </div>
                </div>
            </Card>
        </div>
    );
}
