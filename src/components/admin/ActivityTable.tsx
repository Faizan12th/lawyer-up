'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

interface Activity {
    id: string;
    type: string;
    user: string;
    action: string;
    time: string;
    status: 'pending' | 'info' | 'success' | 'warning';
}

interface ActivityTableProps {
    activities?: Activity[];
}

export function ActivityTable({ activities = [] }: ActivityTableProps) {
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    };

    return (
        <Card className="bg-white border-none shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h3 className="font-semibold text-lg text-gray-900">Recent Activities</h3>
                <p className="text-sm text-gray-500">Latest platform activities and events</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 font-medium bg-white border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-medium">Type</th>
                            <th className="px-6 py-4 font-medium">User</th>
                            <th className="px-6 py-4 font-medium">Action</th>
                            <th className="px-6 py-4 font-medium">Time</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {activities.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                    No recent activities found
                                </td>
                            </tr>
                        ) : (
                            activities.map((activity) => (
                                <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-gray-900">{activity.type}</td>
                                    <td className="px-6 py-4 text-gray-900">{activity.user}</td>
                                    <td className="px-6 py-4 text-gray-600">{activity.action}</td>
                                    <td className="px-6 py-4 text-gray-500">{formatTime(activity.time)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${activity.status === 'success' ? 'bg-[#1C2434] text-white' :
                                                activity.status === 'pending' ? 'bg-[#E2E8F0] text-gray-700' :
                                                    activity.status === 'warning' ? 'bg-red-500 text-white' :
                                                        'bg-white border border-gray-200 text-gray-600'}`}>
                                            {activity.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
