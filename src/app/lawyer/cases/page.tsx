'use client';

import React, { useState, useEffect } from 'react';
// import { Topbar } from '@/components/dashboard/Topbar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Plus, Search, Eye, Edit, Loader2 } from 'lucide-react';
import { AddCaseModal } from '@/components/lawyer/cases/AddCaseModal';

export default function CaseManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cases, setCases] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCases = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/cases');
            const data = await res.json();
            if (res.ok) {
                setCases(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch cases', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCases();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50/50 pb-8">
            {/* Topbar removed */}

            <div className="px-6 py-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div className="relative w-72">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search cases..."
                            className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                    </div>
                    <Button onClick={() => setIsModalOpen(true)} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add New Case
                    </Button>
                </div>

                <Card className="overflow-hidden">
                    <div className="p-6 border-b border-border">
                        <h3 className="text-lg font-semibold">All Cases</h3>
                        <p className="text-sm text-muted-foreground">Manage and track all your legal cases</p>
                    </div>
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                            </div>
                        ) : (
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50/50 text-muted-foreground">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Case ID</th>
                                        <th className="px-6 py-3 font-medium">Title</th>
                                        <th className="px-6 py-3 font-medium">Type</th>
                                        <th className="px-6 py-3 font-medium">Court</th>
                                        <th className="px-6 py-3 font-medium">Status</th>
                                        <th className="px-6 py-3 font-medium">Next Hearing</th>
                                        <th className="px-6 py-3 font-medium">Created</th>
                                        <th className="px-6 py-3 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {cases.length > 0 ? (
                                        cases.map((item) => (
                                            <tr key={item._id} className="hover:bg-gray-50/50">
                                                <td className="px-6 py-4 font-medium">{item.caseNumber || 'N/A'}</td>
                                                <td className="px-6 py-4">{item.title}</td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                        {item.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">{item.court || 'N/A'}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.status === 'active' ? 'bg-gray-900 text-white' :
                                                        item.status === 'draft' ? 'bg-gray-200 text-gray-800' :
                                                            'bg-white border border-gray-200 text-gray-800'
                                                        }`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">{item.nextHearing ? new Date(item.nextHearing).toLocaleDateString() : 'N/A'}</td>
                                                <td className="px-6 py-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button className="rounded-full p-1 hover:bg-gray-100 text-gray-600">
                                                            <Eye className="h-4 w-4" />
                                                        </button>
                                                        <button className="rounded-full p-1 hover:bg-gray-100 text-gray-600">
                                                            <Edit className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                                                No cases found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </Card>
            </div>

            <AddCaseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchCases}
            />
        </div>
    );
}
