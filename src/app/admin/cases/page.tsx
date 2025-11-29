'use client';

import React, { useState } from 'react';
import { Briefcase, Search, Filter, Eye, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { StatsCard } from '@/components/admin/StatsCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// Mock Data
const cases = [
    { id: 'C-2025-001', lawyer: 'Ahmed Khan', client: 'Ali Hassan', type: 'Criminal', status: 'Active', created: 'Sep 1, 2025' },
    { id: 'C-2025-002', lawyer: 'Sara Malik', client: 'Ayesha Khan', type: 'Family', status: 'Active', created: 'Sep 5, 2025' },
    { id: 'C-2025-003', lawyer: 'Hassan Ali', client: 'Imran Malik', type: 'Corporate', status: 'Pending', created: 'Oct 1, 2025' },
    { id: 'C-2025-004', lawyer: 'Fatima Shah', client: 'Zainab Ahmed', type: 'Property', status: 'Active', created: 'Aug 15, 2025' },
    { id: 'C-2025-005', lawyer: 'Bilal Raza', client: 'Omar Siddiqui', type: 'Civil', status: 'Closed', created: 'Jul 20, 2025' },
    { id: 'C-2025-006', lawyer: 'Ahmed Khan', client: 'Hassan Raza', type: 'Criminal', status: 'Active', created: 'Sep 10, 2025' },
    { id: 'C-2025-007', lawyer: 'Sara Malik', client: 'Fatima Khan', type: 'Family', status: 'Active', created: 'Aug 25, 2025' },
];

export default function CaseOversightPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCases = cases.filter(c =>
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.lawyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.client.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Case Oversight</h2>
                    <p className="text-sm text-gray-500">Monitor all cases on the platform</p>
                </div>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search cases..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid gap-6 md:grid-cols-4">
                <StatsCard
                    title="Total Cases"
                    value="2,847"
                    change=""
                    trend="neutral"
                    icon={Briefcase}
                    subtext=""
                />
                <StatsCard
                    title="Active Cases"
                    value="1,523"
                    change=""
                    trend="neutral"
                    icon={Briefcase}
                    subtext=""
                />
                <StatsCard
                    title="Closed Cases"
                    value="1,298"
                    change=""
                    trend="neutral"
                    icon={CheckCircle}
                    subtext=""
                />
                <StatsCard
                    title="Pending"
                    value="26"
                    change=""
                    trend="neutral"
                    icon={Clock}
                    subtext=""
                />
            </div>

            {/* Main Content Card */}
            <Card className="bg-white border-none shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="font-semibold text-lg text-gray-900">All Cases</h3>
                    <p className="text-sm text-gray-500">Complete list of platform cases</p>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 font-medium bg-white border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-medium">Case ID</th>
                                <th className="px-6 py-4 font-medium">Lawyer</th>
                                <th className="px-6 py-4 font-medium">Client</th>
                                <th className="px-6 py-4 font-medium">Type</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Created Date</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredCases.map((c) => (
                                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{c.id}</td>
                                    <td className="px-6 py-4 text-gray-600">{c.lawyer}</td>
                                    <td className="px-6 py-4 text-gray-600">{c.client}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                            {c.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                            ${c.status === 'Active' ? 'bg-[#1C2434] text-white' :
                                                c.status === 'Pending' ? 'bg-[#E2E8F0] text-gray-700' :
                                                    'bg-gray-200 text-gray-600'}`}>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{c.created}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Button size="sm" variant="outline" className="h-8 bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700">
                                            <Eye className="h-4 w-4 mr-2" /> View Case
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
