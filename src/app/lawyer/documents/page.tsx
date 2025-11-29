'use client';

import React, { useState } from 'react';
import { Topbar } from '@/components/dashboard/Topbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    FileText,
    Upload,
    Filter,
    Search,
    Eye,
    Download,
    Trash2,
    BookOpen,
    File
} from 'lucide-react';

export default function DocumentsPage() {
    const [activeTab, setActiveTab] = useState('Case Docs');

    const tabs = ['Case Docs', 'FIRs', 'Evidence', 'AI Drafts'];

    const documents = [
        {
            id: 1,
            name: 'Written_Statement_Draft.docx',
            size: '1.1 MB',
            date: 'Oct 11, 2025',
            tag: 'Statement',
            type: 'doc',
        },
        {
            id: 2,
            name: 'Appeal_Draft.docx',
            size: '1.5 MB',
            date: 'Oct 9, 2025',
            tag: 'Appeal',
            type: 'doc',
        },
        {
            id: 3,
            name: 'Legal_Opinion.pdf',
            size: '987 KB',
            date: 'Oct 3, 2025',
            tag: 'Opinion',
            type: 'pdf',
        },
    ];

    const resources = [
        {
            title: 'Pakistan Penal Code',
            items: ['Section 302 - Murder', 'Section 420 - Cheating', 'Section 489 - Forgery'],
        },
        {
            title: 'Code of Civil Procedure',
            items: ['Order VII - Plaint', 'Order XX - Judgment and Decree', 'Order XXI - Execution'],
        },
        {
            title: 'Qanun-e-Shahadat',
            items: ['Article 17 - Admission', 'Article 72 - Evidence of Character', 'Article 129 - Production of Documents'],
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 pb-8">
            <Topbar title="Documents" subtitle="Welcome back, Advocate Ahmed Khan" />

            <div className="px-6 py-6 space-y-6">
                {/* Search and Actions */}
                <div className="flex items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-lg">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search documents..."
                            className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="gap-2">
                            <Filter className="h-4 w-4" /> Filter
                        </Button>
                        <Button className="gap-2 bg-gray-900 hover:bg-gray-800 text-white">
                            <Upload className="h-4 w-4" /> Upload Document
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Document Library */}
                    <Card className="p-6 lg:col-span-2">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold">Document Library</h3>
                            <p className="text-sm text-muted-foreground">Organize and manage all your case documents</p>
                        </div>

                        {/* Tabs */}
                        <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${activeTab === tab ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Document List */}
                        <div className="space-y-3">
                            {documents.map((doc) => (
                                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                            <FileText className="h-5 w-5 text-gray-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-sm">{doc.name}</h4>
                                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                                <span>{doc.size}</span>
                                                <span>•</span>
                                                <span>{doc.date}</span>
                                                <span>•</span>
                                                <span className="bg-gray-100 px-2 py-0.5 rounded-full text-gray-700">{doc.tag}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                                            <Download className="h-4 w-4" />
                                        </button>
                                        <button className="p-2 hover:bg-red-50 rounded-full text-red-500">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Legal Resources Sidebar */}
                    <div className="space-y-6">
                        <Card className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <BookOpen className="h-5 w-5" />
                                <h3 className="font-semibold">Legal Resources</h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-6">Pakistan Legal Database</p>

                            <div className="space-y-6">
                                {resources.map((resource, index) => (
                                    <div key={index}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <File className="h-4 w-4 text-muted-foreground" />
                                            <h4 className="font-medium text-sm">{resource.title}</h4>
                                        </div>
                                        <ul className="space-y-2 pl-6">
                                            {resource.items.map((item, i) => (
                                                <li key={i} className="text-xs text-muted-foreground hover:text-primary cursor-pointer">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Storage Usage */}
                <Card className="p-6">
                    <h3 className="font-semibold mb-4">Storage Usage</h3>
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span>Storage Used</span>
                        <span className="text-muted-foreground">4.2 GB / 50 GB</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gray-900 w-[8.4%] rounded-full"></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">45.8 GB available</p>
                </Card>
            </div>
        </div>
    );
}
