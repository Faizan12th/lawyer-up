'use client';

import React from 'react';
// import { Topbar } from '@/components/dashboard/Topbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Download, Filter, Search } from 'lucide-react';

export default function FirmBillingPage() {
    const stats = [
        { label: 'Total Earnings', value: 'PKR 1025K', subtext: 'This month' },
        { label: 'Firm Commission', value: 'PKR 205K', subtext: '20% of total earnings' },
        { label: 'Net to Lawyers', value: 'PKR 820K', subtext: 'After commission' },
        { label: 'Total Cases', value: '45', subtext: 'This month' },
    ];

    const billingData = [
        {
            lawyer: 'Ahmed Khan',
            cases: 12,
            consultations: 15,
            avgFee: 'PKR 20,000',
            totalEarnings: 'PKR 240,000',
            commission: '- PKR 48,000',
            netAmount: 'PKR 192,000',
        },
        {
            lawyer: 'Sara Malik',
            cases: 8,
            consultations: 10,
            avgFee: 'PKR 20,000',
            totalEarnings: 'PKR 160,000',
            commission: '- PKR 32,000',
            netAmount: 'PKR 128,000',
        },
        {
            lawyer: 'Hassan Ali',
            cases: 15,
            consultations: 12,
            avgFee: 'PKR 30,000',
            totalEarnings: 'PKR 450,000',
            commission: '- PKR 90,000',
            netAmount: 'PKR 360,000',
        },
        {
            lawyer: 'Fatima Shah',
            cases: 10,
            consultations: 8,
            avgFee: 'PKR 17,500',
            totalEarnings: 'PKR 175,000',
            commission: '- PKR 35,000',
            netAmount: 'PKR 140,000',
        },
        {
            lawyer: 'Bilal Raza',
            cases: 0,
            consultations: 0,
            avgFee: 'PKR 0',
            totalEarnings: 'PKR 0',
            commission: '- PKR 0',
            netAmount: 'PKR 0',
        },
    ];

    const transactions = [
        {
            date: 'Oct 11, 2025',
            lawyer: 'Ahmed Khan',
            caseId: 'C-2025-001',
            client: 'Ali Hassan',
            type: 'Case Fee',
            amount: 'PKR 20,000',
            status: 'Paid',
        },
        {
            date: 'Oct 10, 2025',
            lawyer: 'Hassan Ali',
            caseId: 'C-2025-003',
            client: 'TechCorp Ltd',
            type: 'Consultation',
            amount: 'PKR 8,000',
            status: 'Paid',
        },
        {
            date: 'Oct 9, 2025',
            lawyer: 'Sara Malik',
            caseId: 'C-2025-002',
            client: 'Ayesha Khan',
            type: 'Case Fee',
            amount: 'PKR 15,000',
            status: 'Pending',
        },
        {
            date: 'Oct 8, 2025',
            lawyer: 'Fatima Shah',
            caseId: 'C-2025-004',
            client: 'Zainab Ahmed',
            type: 'Consultation',
            amount: 'PKR 5,000',
            status: 'Paid',
        },
        {
            date: 'Oct 7, 2025',
            lawyer: 'Ahmed Khan',
            caseId: 'C-2025-005',
            client: 'Business Ltd',
            type: 'Case Fee',
            amount: 'PKR 25,000',
            status: 'Paid',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 pb-8">
            {/* Topbar removed */}

            <div className="px-6 py-6 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-xl font-semibold">Centralized Billing</h2>
                        <p className="text-sm text-muted-foreground">Track earnings, commissions, and payments</p>
                    </div>
                    <Button variant="outline" className="gap-2 bg-white">
                        <Download className="h-4 w-4" /> Download Report
                    </Button>
                </div>

                {/* Filters */}
                <Card className="p-4">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="h-4 w-4 text-gray-500" />
                        <span className="font-semibold text-sm">Filters</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500">Date Range</label>
                            <select className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white">
                                <option>This Month</option>
                                <option>Last Month</option>
                                <option>This Year</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500">Filter by Lawyer</label>
                            <select className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white">
                                <option>All Lawyers</option>
                                <option>Ahmed Khan</option>
                                <option>Sara Malik</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-500">Search</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full pl-8 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <Card key={index} className="p-6">
                            <p className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</p>
                            <div className="text-3xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">{stat.subtext}</p>
                        </Card>
                    ))}
                </div>

                {/* Billing Breakdown */}
                <Card className="p-6">
                    <div className="mb-6">
                        <h3 className="font-semibold">Lawyer Billing Breakdown</h3>
                        <p className="text-sm text-muted-foreground">Detailed earnings and commission report</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase border-b border-gray-100 bg-gray-50/50">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Lawyer Name</th>
                                    <th className="px-4 py-3 font-medium text-center">Cases</th>
                                    <th className="px-4 py-3 font-medium text-center">Consultations</th>
                                    <th className="px-4 py-3 font-medium text-right">Avg. Case Fee</th>
                                    <th className="px-4 py-3 font-medium text-right">Total Earnings</th>
                                    <th className="px-4 py-3 font-medium text-right">Commission (20%)</th>
                                    <th className="px-4 py-3 font-medium text-right">Net Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {billingData.map((row, index) => (
                                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-900">{row.lawyer}</td>
                                        <td className="px-4 py-3 text-center">{row.cases}</td>
                                        <td className="px-4 py-3 text-center">{row.consultations}</td>
                                        <td className="px-4 py-3 text-right text-gray-500">{row.avgFee}</td>
                                        <td className="px-4 py-3 text-right font-medium">{row.totalEarnings}</td>
                                        <td className="px-4 py-3 text-right text-red-600">{row.commission}</td>
                                        <td className="px-4 py-3 text-right font-bold text-gray-900">{row.netAmount}</td>
                                    </tr>
                                ))}
                                <tr className="bg-gray-50 font-semibold">
                                    <td className="px-4 py-3">Total</td>
                                    <td className="px-4 py-3 text-center">45</td>
                                    <td className="px-4 py-3 text-center">45</td>
                                    <td className="px-4 py-3 text-right">-</td>
                                    <td className="px-4 py-3 text-right">PKR 1,025,000</td>
                                    <td className="px-4 py-3 text-right text-red-600">- PKR 205,000</td>
                                    <td className="px-4 py-3 text-right">PKR 820,000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Recent Transactions */}
                <Card className="p-6">
                    <div className="mb-6">
                        <h3 className="font-semibold">Recent Transactions</h3>
                        <p className="text-sm text-muted-foreground">Latest payment records</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase border-b border-gray-100">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Date</th>
                                    <th className="px-4 py-3 font-medium">Lawyer</th>
                                    <th className="px-4 py-3 font-medium">Case ID</th>
                                    <th className="px-4 py-3 font-medium">Client</th>
                                    <th className="px-4 py-3 font-medium">Type</th>
                                    <th className="px-4 py-3 font-medium text-right">Amount</th>
                                    <th className="px-4 py-3 font-medium text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {transactions.map((tx, index) => (
                                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-4 py-3 text-gray-500">{tx.date}</td>
                                        <td className="px-4 py-3 font-medium">{tx.lawyer}</td>
                                        <td className="px-4 py-3 text-gray-500">{tx.caseId}</td>
                                        <td className="px-4 py-3">{tx.client}</td>
                                        <td className="px-4 py-3">{tx.type}</td>
                                        <td className="px-4 py-3 text-right font-medium">{tx.amount}</td>
                                        <td className="px-4 py-3 text-right">
                                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${tx.status === 'Paid'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
