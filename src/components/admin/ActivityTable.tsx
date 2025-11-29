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

const activities: Activity[] = [
    { id: '1', type: 'Lawyer Registration', user: 'Ahmed Khan', action: 'Pending Verification', time: '5 mins ago', status: 'pending' },
    { id: '2', type: 'Case Filed', user: 'Sara Malik', action: 'New case #C-2025-145', time: '12 mins ago', status: 'info' },
    { id: '3', type: 'Payment Processed', user: 'Hassan Ali', action: 'PKR 8,000', time: '25 mins ago', status: 'success' },
    { id: '4', type: 'Feedback Submitted', user: 'Fatima Shah', action: '5 star review', time: '1 hour ago', status: 'success' },
    { id: '5', type: 'Firm Registration', user: 'Legal Partners LLP', action: 'Pending Verification', time: '2 hours ago', status: 'pending' },
    { id: '6', type: 'User Suspended', user: 'Bilal Raza', action: 'Policy violation', time: '3 hours ago', status: 'warning' },
    { id: '7', type: 'Document Verified', user: 'Zainab Khan', action: 'License approved', time: '4 hours ago', status: 'success' },
];

export function ActivityTable() {
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
                        {activities.map((activity) => (
                            <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-900">{activity.type}</td>
                                <td className="px-6 py-4 text-gray-900">{activity.user}</td>
                                <td className="px-6 py-4 text-gray-600">{activity.action}</td>
                                <td className="px-6 py-4 text-gray-500">{activity.time}</td>
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
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
