'use client';

import React, { useState, useEffect } from 'react';
import { Users, Building2, Search, CheckCircle, XCircle, AlertCircle, Loader2, FileText, X } from 'lucide-react';
import { StatsCard } from '@/components/admin/StatsCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function UserManagementPage() {
    const [activeTab, setActiveTab] = useState<'Lawyers' | 'Clients' | 'Law Firms'>('Lawyers');
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [documents, setDocuments] = useState<any[]>([]);
    const [docLoading, setDocLoading] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/users');
            const data = await res.json();
            if (res.ok) {
                setUsers(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch users', error);
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleStatusChange = async (userId: string, status: string) => {
        try {
            const res = await fetch(`/api/admin/users/${userId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                toast.success(`User status updated to ${status}`);
                fetchUsers(); // Refresh list
            } else {
                toast.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status', error);
            toast.error('Error updating status');
        }
    };

    const handleViewDocuments = async (userId: string) => {
        setSelectedUser(userId);
        setDocLoading(true);
        try {
            const res = await fetch(`/api/users/verification-documents?userId=${userId}`);
            const data = await res.json();
            if (res.ok) {
                setDocuments(data.data);
            } else {
                toast.error('Failed to fetch documents');
            }
        } catch (error) {
            console.error('Failed to fetch documents', error);
            toast.error('Failed to fetch documents');
        } finally {
            setDocLoading(false);
        }
    };

    const filteredUsers = users.filter(user => {
        const roleMap: Record<string, string> = {
            'Lawyers': 'lawyer',
            'Clients': 'client',
            'Law Firms': 'law_firm'
        };

        const matchesTab = user.role === roleMap[activeTab];

        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesSearch;
    });

    const stats = {
        totalLawyers: users.filter(u => u.role === 'lawyer').length,
        pendingLawyers: users.filter(u => u.role === 'lawyer' && u.status === 'pending').length,
        totalClients: users.filter(u => u.role === 'client').length,
        totalFirms: users.filter(u => u.role === 'law_firm').length,
        pendingFirms: users.filter(u => u.role === 'law_firm' && u.status === 'pending').length,
    };

    return (
        <div className="space-y-6 relative">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
                    <p className="text-sm text-gray-500">Manage and verify platform users</p>
                </div>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid gap-6 md:grid-cols-3">
                <StatsCard
                    title="Total Lawyers"
                    value={stats.totalLawyers.toString()}
                    change={`${stats.pendingLawyers} pending verification`}
                    trend="neutral"
                    icon={Users}
                    subtext=""
                />
                <StatsCard
                    title="Total Clients"
                    value={stats.totalClients.toString()}
                    change="All active users"
                    trend="neutral"
                    icon={Users}
                    subtext=""
                />
                <StatsCard
                    title="Law Firms"
                    value={stats.totalFirms.toString()}
                    change={`${stats.pendingFirms} pending verification`}
                    trend="neutral"
                    icon={Building2}
                    subtext=""
                />
            </div>

            {/* Main Content Card */}
            <Card className="bg-white border-none shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h3 className="font-semibold text-lg text-gray-900">Users</h3>
                        <p className="text-sm text-gray-500 hidden sm:block">Manage all platform users</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex p-1 bg-gray-100 rounded-lg w-full sm:w-fit">
                        {['Lawyers', 'Clients', 'Law Firms'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`flex-1 sm:flex-none px-6 py-2 text-sm font-medium rounded-md transition-all ${activeTab === tab
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                        </div>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 font-medium bg-white border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Name</th>
                                    <th className="px-6 py-4 font-medium">Email</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium">Joined</th>
                                    <th className="px-6 py-4 font-medium"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                                            <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                    ${user.status === 'active' ? 'bg-[#1C2434] text-white' :
                                                        user.status === 'pending' ? 'bg-[#E2E8F0] text-gray-700' :
                                                            'bg-red-500 text-white'}`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    {(user.role === 'lawyer' || user.role === 'law_firm') && (
                                                        <Button size="sm" variant="outline" onClick={() => handleViewDocuments(user._id)} className="h-8 bg-blue-50 border-transparent hover:bg-blue-100 text-blue-600">
                                                            <FileText className="h-4 w-4 mr-1" /> Docs
                                                        </Button>
                                                    )}
                                                    {user.status === 'pending' ? (
                                                        <>
                                                            <Button size="sm" variant="outline" onClick={() => handleStatusChange(user._id, 'active')} className="h-8 bg-gray-100 border-transparent hover:bg-gray-200 text-gray-900">
                                                                <CheckCircle className="h-4 w-4 mr-1" /> Approve
                                                            </Button>
                                                            <Button size="sm" variant="outline" onClick={() => handleStatusChange(user._id, 'rejected')} className="h-8 bg-red-50 border-transparent hover:bg-red-100 text-red-600">
                                                                <XCircle className="h-4 w-4 mr-1" /> Reject
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <Button size="sm" variant="outline" onClick={() => handleStatusChange(user._id, 'suspended')} className="h-8 border-gray-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-100">
                                                            <AlertCircle className="h-4 w-4 mr-1" /> Suspend
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </Card>

            {/* Documents Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="text-lg font-semibold">Verification Documents</h3>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedUser(null)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            {docLoading ? (
                                <div className="flex justify-center py-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                                </div>
                            ) : documents.length > 0 ? (
                                <div className="space-y-6">
                                    {documents.map((doc, index) => (
                                        <div key={index} className="border rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="font-medium capitalize">{doc.type.replace('_', ' ')}</p>
                                                <span className={`text-xs px-2 py-1 rounded-full ${doc.status === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {doc.status}
                                                </span>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                                                <img src={doc.url} alt={doc.type} className="max-h-64 object-contain" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-8">No documents uploaded.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
