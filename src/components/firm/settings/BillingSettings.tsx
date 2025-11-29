import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CreditCard, Wallet, Receipt, History } from 'lucide-react';

export function BillingSettings() {
    return (
        <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="p-6 col-span-2">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <Wallet className="h-5 w-5 text-gray-900" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Payout Settings</h3>
                            <p className="text-sm text-muted-foreground">Manage how you receive payments</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Default Commission Rate (%)</label>
                            <input type="number" defaultValue="20" className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900" />
                            <p className="text-xs text-muted-foreground">This rate applies to all new cases unless overridden.</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Payout Schedule</label>
                            <select className="w-full px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900">
                                <option>Monthly (1st of each month)</option>
                                <option>Weekly (Every Monday)</option>
                                <option>Bi-Weekly (Every other Friday)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Bank Account</label>
                            <div className="flex items-center gap-2 p-3 border rounded-md bg-gray-50">
                                <div className="h-8 w-12 bg-white border rounded flex items-center justify-center">
                                    <span className="text-xs font-bold text-gray-600">VISA</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Chase Bank **** 8899</p>
                                    <p className="text-xs text-muted-foreground">Primary Payout Method</p>
                                </div>
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">Edit</Button>
                            </div>
                        </div>
                        <div className="pt-2">
                            <Button className="bg-gray-900 text-white hover:bg-gray-800">Update Payout Settings</Button>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <Receipt className="h-5 w-5 text-gray-900" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Current Balance</h3>
                            <p className="text-sm text-muted-foreground">Available for payout</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-3xl font-bold">$12,450.00</h2>
                        <p className="text-sm text-green-600 font-medium mt-1">+15% from last month</p>
                    </div>

                    <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 mb-3">Request Payout</Button>
                    <Button variant="outline" className="w-full">View Statement</Button>
                </Card>
            </div>

            <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <History className="h-5 w-5 text-gray-900" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Recent Transactions</h3>
                        <p className="text-sm text-muted-foreground">History of payouts and commissions</p>
                    </div>
                </div>

                <div className="space-y-1">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                                    <CreditCard className="h-4 w-4 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Payout to Chase Bank</p>
                                    <p className="text-xs text-muted-foreground">Nov {28 - i}, 2024</p>
                                </div>
                            </div>
                            <span className="text-sm font-medium">-$4,250.00</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
