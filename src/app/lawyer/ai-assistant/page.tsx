'use client';

import React from 'react';
// import { Topbar } from '@/components/dashboard/Topbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Bot, FileText, Search, Sparkles } from 'lucide-react';

export default function AIAssistantPage() {
    const previousDrafts = [
        {
            title: 'Criminal Appeal Draft',
            type: 'Written Statement',
            date: 'Oct 10, 2025',
        },
        {
            title: 'Property Dispute Analysis',
            type: 'Legal Analysis',
            date: 'Oct 8, 2025',
        },
        {
            title: 'Corporate Agreement',
            type: 'Contract Draft',
            date: 'Oct 5, 2025',
        },
        {
            title: 'Divorce Petition',
            type: 'Petition',
            date: 'Oct 3, 2025',
        },
        {
            title: 'FIR Analysis',
            type: 'Case Review',
            date: 'Oct 1, 2025',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 pb-8">
            {/* Topbar removed */}

            <div className="px-6 py-6 space-y-6">
                {/* Header Card */}
                <Card className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <Bot className="h-6 w-6 text-gray-900" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">AI Legal Assistant</h2>
                            <p className="text-muted-foreground">
                                Generate legal documents, get case insights, and explore relevant laws powered by AI
                            </p>
                        </div>
                    </div>
                </Card>

                <div className="grid gap-6 lg:grid-cols-3 h-[600px]">
                    {/* Previous Drafts Sidebar */}
                    <Card className="p-6 lg:col-span-1 overflow-y-auto">
                        <h3 className="font-semibold mb-4">Previous Drafts & Sessions</h3>
                        <div className="space-y-3">
                            {previousDrafts.map((draft, index) => (
                                <div
                                    key={index}
                                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-1">
                                        <span className="font-medium text-sm">{draft.title}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>{draft.type}</span>
                                        <span>{draft.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Chat Interface */}
                    <Card className="p-6 lg:col-span-2 flex flex-col">
                        <div className="mb-6">
                            <h3 className="font-semibold">AI Conversation</h3>
                            <p className="text-sm text-muted-foreground">Describe your case and the AI will ask clarifying questions</p>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg bg-gray-50/50 mb-6">
                            <textarea
                                className="w-full h-full bg-transparent border-none resize-none focus:outline-none text-sm"
                                placeholder="Describe your case in detail. Include facts, parties involved, legal issues, and what you need help with..."
                            ></textarea>
                        </div>

                        <Button className="w-full gap-2 bg-gray-900 hover:bg-gray-800 text-white py-6">
                            <Sparkles className="h-5 w-5" />
                            Start AI Analysis
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
