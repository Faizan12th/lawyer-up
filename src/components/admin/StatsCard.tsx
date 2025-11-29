'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'neutral';
    icon: LucideIcon;
    subtext?: string;
}

export function StatsCard({ title, value, change, trend, icon: Icon, subtext }: StatsCardProps) {
    return (
        <Card className="p-6 bg-white border-none shadow-sm h-full flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-medium text-gray-600">{title}</h3>
                <Icon className="h-5 w-5 text-gray-400" />
            </div>

            <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
                <div className="flex items-center text-xs text-gray-500">
                    {trend !== 'neutral' && (
                        <span className={`flex items-center mr-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                            {change}
                        </span>
                    )}
                    <span>{subtext || 'from last month'}</span>
                </div>
            </div>
        </Card>
    );
}
