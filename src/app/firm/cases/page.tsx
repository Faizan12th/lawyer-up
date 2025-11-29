'use client';

import React, { useState, useEffect } from 'react';
import { Topbar } from '@/components/dashboard/Topbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, Search, Filter, MoreVertical, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FirmCasesPage() {
    const [cases, setCases] = useState<any[]>([]);
    const [lawyers, setLawyers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCase, setNewCase] = useState({
        title: '',
        description: '',
        clientEmail: '',
        lawyerId: '',
        priority: 'Medium',
        dueDate: ''
    });
    const [creating, setCreating] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [casesRes, lawyersRes] = await Promise.all([
                fetch('/api/firm/cases'),
                fetch('/api/firm/lawyers')
            ]);

            const casesData = await casesRes.json();
            const lawyersData = await lawyersRes.json();

            if (casesRes.ok) setCases(casesData.data || []);
            if (lawyersRes.ok) setLawyers(lawyersData.data || []);

        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateCase = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setCreating(true);
            const res = await fetch('/api/firm/cases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCase),
            });
            const data = await res.json();

            if (res.ok) {
                toast.success('Case created successfully');
                setIsAddModalOpen(false);
                setNewCase({
                    title: '',
                    description: '',
                    clientEmail: '',
                    lawyerId: '',
                    priority: 'Medium',
                    dueDate: ''
                });
                fetchData();
            } else {
                toast.error(data.error || 'Failed to create case');
            }
        } catch (error) {
            console.error('Error creating case:', error);
            toast.error('An error occurred');
        } finally {
            setCreating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-900" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pb-8">
            <Topbar title="Case Assignment" subtitle="Legal Partners LLP" />

            <div className="px-6 py-6 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-xl font-semibold">Case Assignment</h2>
                        <p className="text-sm text-muted-foreground">Manage and assign cases to lawyers</p>
                    </div>
                    <Button onClick={() => setIsAddModalOpen(true)} className="gap-2 bg-gray-900 hover:bg-gray-800 text-white">
                        <Plus className="h-4 w-4" /> New Case
                    </Button>
                </div>

                {/* Filters */}
                <Card className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search cases..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="gap-2 bg-white">
                                <Filter className="h-4 w-4" /> Filter
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Cases Table */}
                <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Case Title</th>
                                    <th className="px-6 py-4 font-medium">Client</th>
                                    <th className="px-6 py-4 font-medium">Assigned To</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium">Priority</th>
                                    <th className="px-6 py-4 font-medium">Due Date</th>
                                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {cases.length > 0 ? (
                                    cases.map((item) => (
                                        <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                                            <td className="px-6 py-4 text-gray-500">{item.client?.name || 'Unknown'}</td>
                                            <td className="px-6 py-4">
                                                {!item.lawyer ? (
                                                    <span className="text-red-500 font-medium text-xs bg-red-50 px-2 py-1 rounded-full">
                                                        Unassigned
                                                    </span>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                                                            {item.lawyer.name?.charAt(0)}
                                                        </div>
                                                        <span>{item.lawyer.name}</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.status === 'active' ? 'bg-blue-100 text-blue-800' :
                                                    item.status === 'closed' ? 'bg-green-100 text-green-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-medium ${item.priority === 'High' ? 'text-red-600' :
                                                    item.priority === 'Medium' ? 'text-yellow-600' :
                                                        'text-green-600'
                                                    }`}>
                                                    {item.priority}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">
                                                {item.deadline ? new Date(item.deadline).toLocaleDateString() : 'No deadline'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <MoreVertical className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                                            No cases found. Create a new case to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {/* New Case Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Create New Case</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleCreateCase} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Case Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    value={newCase.title}
                                    onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Client Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    value={newCase.clientEmail}
                                    onChange={(e) => setNewCase({ ...newCase, clientEmail: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Assign Lawyer</label>
                                <select
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    value={newCase.lawyerId}
                                    onChange={(e) => setNewCase({ ...newCase, lawyerId: e.target.value })}
                                >
                                    <option value="">Select Lawyer</option>
                                    {lawyers.map(l => (
                                        <option key={l.id} value={l.id}>{l.name} ({l.specialization})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                    <select
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                                        value={newCase.priority}
                                        onChange={(e) => setNewCase({ ...newCase, priority: e.target.value })}
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                                        value={newCase.dueDate}
                                        onChange={(e) => setNewCase({ ...newCase, dueDate: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    rows={3}
                                    value={newCase.description}
                                    onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-gray-900 text-white" disabled={creating}>
                                    {creating ? 'Creating...' : 'Create Case'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
