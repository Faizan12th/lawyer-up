'use client';

import React, { useState } from 'react';
// import { Topbar } from '@/components/dashboard/Topbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    ArrowLeft,
    Download,
    CreditCard,
    Wallet,
    History
} from 'lucide-react';
import Link from 'next/link';

export default function ClientBillingPage() {
    const [activeTab, setActiveTab] = useState<'all' | 'paid' | 'pending'>('all');

    const stats = [
        { label: 'Pending Payments', value: 'PKR 5K', subtext: '1 payment due' },
        { label: 'Total Spent', value: 'PKR 19.5K', subtext: 'Last 6 months' },
        { label: 'Total Consultations', value: '4', subtext: 'Completed' },
    ];

    const pendingPayment = {
        lawyer: 'Adv. Ahmed Khan',
        service: 'Consultation',
        dueDate: 'Oct 15, 2025',
        amount: 'PKR 5,000',
    };

    const transactions = [
        {
            id: 'INV-2025-001',
            lawyer: 'Adv. Hassan Ali',
            service: 'Legal Consultation',
            date: 'Oct 10, 2025',
            method: 'Credit Card',
            amount: 'PKR 8,000',
            status: 'Paid',
        },
        {
            id: 'INV-2025-002',
            lawyer: 'Adv. Ahmed Khan',
            service: 'Case Review',
            date: 'Oct 5, 2025',
            method: 'JazzCash',
            amount: 'PKR 5,000',
            status: 'Paid',
        },
        {
            id: 'INV-2025-003',
            lawyer: 'Adv. Sara Malik',
            service: 'Document Review',
            date: 'Sep 28, 2025',
            method: 'EasyPaisa',
            amount: 'PKR 3,000',
            status: 'Paid',
        },
        {
            id: 'INV-2025-004',
            lawyer: 'Adv. Fatima Shah',
            service: 'Consultation',
            date: 'Sep 20, 2025',
            method: 'Credit Card',
            amount: 'PKR 3,500',
            status: 'Paid',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 pb-8">
            {/* Topbar removed */}

            <div className="px-6 py-6 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                    <Link href="/client/dashboard" className="text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <h2 className="text-xl font-semibold">Payment & Billing</h2>
                </div>
                <p className="text-sm text-muted-foreground -mt-4 mb-6 ml-6">Manage your payments and view transaction history</p>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-3">
                    {stats.map((stat, index) => (
                        <Card key={index} className="p-6">
                            <p className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</p>
                            <div className="text-3xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">{stat.subtext}</p>
                        </Card>
                    ))}
                </div>

                {/* Pending Payments */}
                <Card className="p-6">
                    <div className="mb-4">
                        <h3 className="font-semibold">Pending Payments</h3>
                        <p className="text-sm text-muted-foreground">Outstanding payments requiring action</p>
                    </div>
                    <div className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h4 className="font-semibold">{pendingPayment.lawyer}</h4>
                            <p className="text-sm text-muted-foreground">{pendingPayment.service}</p>
                            <p className="text-sm text-muted-foreground">Due: {pendingPayment.dueDate}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-xl font-bold">{pendingPayment.amount}</div>
                                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                                    Pending
                                </span>
                            </div>
                            <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                                Pay Now
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Transaction History */}
                <Card className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <div>
                            <h3 className="font-semibold">Transaction History</h3>
                            <p className="text-sm text-muted-foreground">All your payment records</p>
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Download className="h-4 w-4" /> Export
                        </Button>
                    </div>

                    <div className="flex gap-2 mb-6">
                        {['All Transactions', 'Paid', 'Pending'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '') as any)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === tab.toLowerCase().replace(' ', '')
                                    ? 'bg-gray-100 text-gray-900 font-semibold'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Invoice ID</th>
                                    <th className="px-4 py-3 font-medium">Lawyer</th>
                                    <th className="px-4 py-3 font-medium">Service</th>
                                    <th className="px-4 py-3 font-medium">Date</th>
                                    <th className="px-4 py-3 font-medium">Method</th>
                                    <th className="px-4 py-3 font-medium">Amount</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {transactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-900">{tx.id}</td>
                                        <td className="px-4 py-3">{tx.lawyer}</td>
                                        <td className="px-4 py-3">{tx.service}</td>
                                        <td className="px-4 py-3 text-gray-500">{tx.date}</td>
                                        <td className="px-4 py-3 flex items-center gap-2">
                                            <CreditCard className="h-3 w-3 text-gray-400" />
                                            {tx.method}
                                        </td>
                                        <td className="px-4 py-3 font-medium">{tx.amount}</td>
                                        <td className="px-4 py-3">
                                            <span className="inline-flex items-center rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-medium text-white">
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button className="text-gray-500 hover:text-gray-900 flex items-center gap-1 ml-auto text-xs font-medium">
                                                <Download className="h-3 w-3" /> Receipt
                                            </button>
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
