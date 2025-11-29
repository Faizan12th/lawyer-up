'use client';

import React, { useState, useEffect } from 'react';
import { Topbar } from '@/components/dashboard/Topbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, Briefcase, Star, Ban, CheckCircle, Plus, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LawyerManagementPage() {
    const [lawyers, setLawyers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newLawyer, setNewLawyer] = useState({ name: '', email: '', password: '', specialization: '' });
    const [adding, setAdding] = useState(false);

    const fetchLawyers = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/firm/lawyers');
            const data = await res.json();
            if (res.ok) {
                setLawyers(data.data || []);
            } else {
                toast.error(data.error || 'Failed to fetch lawyers');
            }
        } catch (error) {
            console.error('Error fetching lawyers:', error);
            toast.error('Failed to load lawyers');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLawyers();
    }, []);

    const handleAddLawyer = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setAdding(true);
            const res = await fetch('/api/firm/lawyers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newLawyer),
            });
            const data = await res.json();

            if (res.ok) {
                toast.success('Lawyer added successfully');
                setIsAddModalOpen(false);
                setNewLawyer({ name: '', email: '', password: '', specialization: '' });
                fetchLawyers();
            } else {
                toast.error(data.error || 'Failed to add lawyer');
            }
        } catch (error) {
            console.error('Error adding lawyer:', error);
            toast.error('An error occurred');
        } finally {
            setAdding(false);
        }
    };

    const stats = [
        { label: 'Total Lawyers', value: lawyers.length.toString() },
        { label: 'Active Lawyers', value: lawyers.filter(l => l.status === 'Active').length.toString() },
        { label: 'Total Cases Assigned', value: lawyers.reduce((acc, curr) => acc + (curr.assignedCases || 0), 0).toString() },
        { label: 'Avg. Cases per Lawyer', value: lawyers.length > 0 ? (lawyers.reduce((acc, curr) => acc + (curr.assignedCases || 0), 0) / lawyers.length).toFixed(1) : '0' },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-900" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pb-8">
            <Topbar title="Lawyer Management" subtitle="Legal Partners LLP" />

            <div className="px-6 py-6 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-xl font-semibold">Lawyer Management</h2>
                        <p className="text-sm text-muted-foreground">Manage firm lawyers and case assignments</p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search lawyers..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                            />
                        </div>
                        <Button onClick={() => setIsAddModalOpen(true)} className="bg-gray-900 text-white gap-2 whitespace-nowrap">
                            <Plus className="h-4 w-4" /> Add Lawyer
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <Card key={index} className="p-6">
                            <p className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</p>
                            <div className="text-3xl font-bold">{stat.value}</div>
                        </Card>
                    ))}
                </div>

                {/* Lawyers Table */}
                <Card className="p-6">
                    <div className="mb-6">
                        <h3 className="font-semibold">Firm Lawyers</h3>
                        <p className="text-sm text-muted-foreground">All lawyers in your firm</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase border-b border-gray-100">
                                <tr className="text-left">
                                    <th className="px-4 py-3 font-medium">Name</th>
                                    <th className="px-4 py-3 font-medium">Email</th>
                                    <th className="px-4 py-3 font-medium">Specialization</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium">Assigned Cases</th>
                                    <th className="px-4 py-3 font-medium">Completed</th>
                                    <th className="px-4 py-3 font-medium">Rating</th>
                                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {lawyers.length > 0 ? (
                                    lawyers.map((lawyer) => (
                                        <tr key={lawyer.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-4 py-4 font-medium text-gray-900">{lawyer.name}</td>
                                            <td className="px-4 py-4 text-gray-500">{lawyer.email}</td>
                                            <td className="px-4 py-4">
                                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 border border-gray-200">
                                                    {lawyer.specialization}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${lawyer.status === 'Active'
                                                    ? 'bg-gray-900 text-white'
                                                    : 'bg-gray-200 text-gray-600'
                                                    }`}>
                                                    {lawyer.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">{lawyer.assignedCases}</td>
                                            <td className="px-4 py-4">{lawyer.completed}</td>
                                            <td className="px-4 py-4 flex items-center gap-1">
                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                {lawyer.rating || 'N/A'}
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="outline" className="h-8 text-xs gap-1 bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700">
                                                        <Briefcase className="h-3 w-3" /> Assign Case
                                                    </Button>
                                                    <button className="text-gray-400 hover:text-red-600 transition-colors p-1">
                                                        <Ban className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                                            No lawyers found. Add a lawyer to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {/* Add Lawyer Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Add New Lawyer</h3>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleAddLawyer} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    value={newLawyer.name}
                                    onChange={(e) => setNewLawyer({ ...newLawyer, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    value={newLawyer.email}
                                    onChange={(e) => setNewLawyer({ ...newLawyer, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    value={newLawyer.password}
                                    onChange={(e) => setNewLawyer({ ...newLawyer, password: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                                <select
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                                    value={newLawyer.specialization}
                                    onChange={(e) => setNewLawyer({ ...newLawyer, specialization: e.target.value })}
                                >
                                    <option value="">Select Specialization</option>
                                    <option value="Criminal Law">Criminal Law</option>
                                    <option value="Family Law">Family Law</option>
                                    <option value="Corporate Law">Corporate Law</option>
                                    <option value="Property Law">Property Law</option>
                                    <option value="Civil Law">Civil Law</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-gray-900 text-white" disabled={adding}>
                                    {adding ? 'Adding...' : 'Add Lawyer'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
