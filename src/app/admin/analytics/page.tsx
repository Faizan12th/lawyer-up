'use client';

import React from 'react';
import { LogIn, Cpu, CreditCard, Activity, Download, Filter, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { StatsCard } from '@/components/admin/StatsCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { LoginActivityChart } from '@/components/admin/charts/LoginActivityChart';
import { AiUsageChart } from '@/components/admin/charts/AiUsageChart';
import { RegionalDistChart } from '@/components/admin/charts/RegionalDistChart';
import { PaymentSummaryChart } from '@/components/admin/charts/PaymentSummaryChart';

export default function SystemAnalyticsPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">System Logs & Analytics</h2>
                    <p className="text-sm text-gray-500">Comprehensive platform analytics and insights</p>
                </div>
                <Button variant="outline" className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50">
                    <Download className="h-4 w-4 mr-2" /> Export Report
                </Button>
            </div>

            {/* Filters */}
            <Card className="bg-white border-none shadow-sm p-4">
                <div className="flex items-center gap-2 mb-4">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">Filters</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs text-gray-500">Date Range</label>
                        <select className="w-full text-sm border-gray-200 rounded-md focus:ring-gray-900 focus:border-gray-900">
                            <option>Last 30 Days</option>
                            <option>Last 7 Days</option>
                            <option>Today</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-gray-500">User Role</label>
                        <select className="w-full text-sm border-gray-200 rounded-md focus:ring-gray-900 focus:border-gray-900">
                            <option>All Roles</option>
                            <option>Lawyers</option>
                            <option>Clients</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-gray-500">Region</label>
                        <select className="w-full text-sm border-gray-200 rounded-md focus:ring-gray-900 focus:border-gray-900">
                            <option>All Regions</option>
                            <option>Lahore</option>
                            <option>Karachi</option>
                        </select>
                    </div>
                </div>
            </Card>

            {/* Stats Row */}
            <div className="grid gap-6 md:grid-cols-4">
                <StatsCard
                    title="Total Logins"
                    value="12,847"
                    change="+12% from last period"
                    trend="up"
                    icon={LogIn}
                    subtext=""
                />
                <StatsCard
                    title="AI Queries"
                    value="3,590"
                    change="+24% from last period"
                    trend="up"
                    icon={Cpu}
                    subtext=""
                />
                <StatsCard
                    title="Total Transactions"
                    value="PKR 3.2M"
                    change="+15% from last period"
                    trend="up"
                    icon={CreditCard}
                    subtext=""
                />
                <StatsCard
                    title="Active Sessions"
                    value="584"
                    change="Currently online"
                    trend="neutral"
                    icon={Activity}
                    subtext=""
                />
            </div>

            {/* Charts Grid */}
            <div className="space-y-6">
                <LoginActivityChart />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AiUsageChart />
                    <RegionalDistChart />
                </div>

                <PaymentSummaryChart />
            </div>

            {/* Recent System Events */}
            <Card className="bg-white border-none shadow-sm p-6">
                <div className="mb-6">
                    <h3 className="font-semibold text-gray-900">Recent System Events</h3>
                    <p className="text-sm text-gray-500">Latest system activities and alerts</p>
                </div>

                <div className="space-y-6">
                    <div className="flex justify-between items-start pb-6 border-b border-gray-50">
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="text-sm font-medium text-gray-900">High Login Volume</h4>
                                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 uppercase">Info</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">450 concurrent users detected</p>
                        </div>
                        <span className="text-xs text-gray-400">2 mins ago</span>
                    </div>

                    <div className="flex justify-between items-start pb-6 border-b border-gray-50">
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="text-sm font-medium text-gray-900">Payment Gateway</h4>
                                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#1C2434] text-white uppercase">Success</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Successful transaction #TXN-9988</p>
                        </div>
                        <span className="text-xs text-gray-400">5 mins ago</span>
                    </div>

                    <div className="flex justify-between items-start pb-6 border-b border-gray-50">
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="text-sm font-medium text-gray-900">AI Service</h4>
                                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-yellow-100 text-yellow-800 uppercase">Warning</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Peak usage detected - 95% quota limit</p>
                        </div>
                        <span className="text-xs text-gray-400">13 mins ago</span>
                    </div>

                    <div className="flex justify-between items-start pb-6 border-b border-gray-50">
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="text-sm font-medium text-gray-900">User Verification</h4>
                                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-yellow-100 text-yellow-800 uppercase">Warning</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">23 pending verifications require attention</p>
                        </div>
                        <span className="text-xs text-gray-400">1 hour ago</span>
                    </div>

                    <div className="flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="text-sm font-medium text-gray-900">System Backup</h4>
                                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#1C2434] text-white uppercase">Success</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Database backup completed successfully</p>
                        </div>
                        <span className="text-xs text-gray-400">2 hours ago</span>
                    </div>
                </div>
            </Card>
        </div>
    );
}
