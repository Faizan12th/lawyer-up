'use client';

import React, { useState } from 'react';
import { Topbar } from '@/components/dashboard/Topbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    ArrowLeft,
    HelpCircle,
    Upload,
    Send,
    BookOpen,
    FileText,
    ChevronDown,
    ChevronUp
} from 'lucide-react';
import Link from 'next/link';

export default function ClientSupportPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const queries = [
        {
            id: 1,
            question: 'What are my rights in a property dispute?',
            status: 'Answered',
            date: 'Oct 10, 2025',
            action: 'View Answer',
        },
        {
            id: 2,
            question: 'How long does a divorce case take?',
            status: 'Answered',
            date: 'Oct 5, 2025',
            action: 'View Answer',
        },
        {
            id: 3,
            question: 'Can I file an FIR online?',
            status: 'Open',
            date: 'Oct 12, 2025',
            action: 'Pending',
        },
    ];

    const faqs = [
        {
            id: 1,
            question: 'How do I find the right lawyer for my case?',
            answer: 'You can use our "Find a Lawyer" feature to filter lawyers by specialization, location, and experience. Read reviews and check their success rate to make an informed decision.',
        },
        {
            id: 2,
            question: 'What documents do I need for a legal consultation?',
            answer: 'It depends on your case type. Generally, keep your ID, any relevant contracts, police reports (FIRs), or property documents ready. You can upload them in the "Documents" section.',
        },
        {
            id: 3,
            question: 'How much do legal consultations typically cost?',
            answer: 'Consultation fees vary by lawyer and experience level. You can see the fee on each lawyer\'s profile before booking. Prices typically range from PKR 2,000 to PKR 10,000.',
        },
    ];

    const caseTypes = [
        { id: 1, question: 'What is the difference between civil and criminal cases?' },
        { id: 2, question: 'How long does it take to resolve a property dispute?' },
        { id: 3, question: 'What are my rights in a family law matter?' },
    ];

    const platformUsage = [
        { id: 1, question: 'How do I book an appointment?' },
        { id: 2, question: 'Can I cancel or reschedule an appointment?' },
        { id: 3, question: 'How do I access my consultation chat?' },
    ];

    const legalGuides = [
        {
            title: "Understanding Pakistan's Legal System",
            category: "General",
            description: "An overview of courts, legal processes, and your rights",
        },
        {
            title: "Guide to Filing a Civil Suit",
            category: "Civil Law",
            description: "Step-by-step process for initiating civil litigation",
        },
        {
            title: "Family Law in Pakistan",
            category: "Family Law",
            description: "Comprehensive guide to divorce, custody, and inheritance",
        },
        {
            title: "Criminal Procedure Guide",
            category: "Criminal Law",
            description: "Understanding FIRs, bail, and trial procedures",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 pb-8">
            <Topbar title="Legal Support" subtitle="Client Portal" />

            <div className="px-6 py-6 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                    <Link href="/client/dashboard" className="text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <h2 className="text-xl font-semibold">Legal Support Center</h2>
                </div>
                <p className="text-sm text-muted-foreground -mt-4 mb-6 ml-6">Get answers to your legal questions</p>

                {/* Ask Question Form */}
                <Card className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                        <HelpCircle className="h-5 w-5 text-gray-900 mt-0.5" />
                        <div>
                            <h3 className="font-semibold">Ask a Legal Question</h3>
                            <p className="text-sm text-muted-foreground">Submit your question and get expert answers</p>
                        </div>
                    </div>

                    <textarea
                        placeholder="Type your legal question here..."
                        className="w-full h-32 p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none resize-none text-sm mb-4"
                    />

                    <div className="flex gap-4">
                        <Button variant="outline" className="flex-1 gap-2 bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700">
                            <Upload className="h-4 w-4" /> Upload Attachment
                        </Button>
                        <Button className="flex-1 gap-2 bg-gray-900 hover:bg-gray-800 text-white">
                            <Send className="h-4 w-4" /> Submit Question
                        </Button>
                    </div>
                </Card>

                {/* My Queries */}
                <Card className="p-6">
                    <div className="mb-4">
                        <h3 className="font-semibold">My Queries</h3>
                        <p className="text-sm text-muted-foreground">Track your submitted questions</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase border-b border-gray-100">
                                <tr>
                                    <th className="px-4 py-3 font-medium w-1/2">Question</th>
                                    <th className="px-4 py-3 font-medium">Status</th>
                                    <th className="px-4 py-3 font-medium">Date</th>
                                    <th className="px-4 py-3 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {queries.map((query) => (
                                    <tr key={query.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-4 py-4 text-gray-900">{query.question}</td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${query.status === 'Answered'
                                                    ? 'bg-gray-900 text-white'
                                                    : 'bg-gray-200 text-gray-700'
                                                }`}>
                                                {query.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-gray-500">{query.date}</td>
                                        <td className="px-4 py-4 text-right">
                                            <button className={`text-xs font-medium ${query.status === 'Answered' ? 'text-gray-900 hover:underline' : 'text-gray-400 cursor-not-allowed'
                                                }`}>
                                                {query.action}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Resources Tabs */}
                <div className="bg-gray-200/50 p-1 rounded-lg flex gap-1">
                    <button className="flex-1 py-2 px-4 rounded-md bg-white shadow-sm text-sm font-medium text-gray-900">FAQs</button>
                    <button className="flex-1 py-2 px-4 rounded-md text-sm font-medium text-gray-600 hover:bg-white/50">Legal Guides</button>
                    <button className="flex-1 py-2 px-4 rounded-md text-sm font-medium text-gray-600 hover:bg-white/50">Glossary</button>
                </div>

                {/* FAQs Section */}
                <Card className="p-6">
                    <div className="mb-6">
                        <h3 className="font-semibold">Frequently Asked Questions</h3>
                        <p className="text-sm text-muted-foreground">Common legal questions and answers</p>
                    </div>

                    <div className="relative mb-6">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search FAQs..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-900 text-sm"
                        />
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">General Legal</h4>
                            <div className="space-y-2">
                                {faqs.map((faq) => (
                                    <div key={faq.id} className="border-b border-gray-100 last:border-0 pb-2">
                                        <button
                                            onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                                            className="w-full flex justify-between items-center py-2 text-left hover:text-gray-600 transition-colors"
                                        >
                                            <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                                            {openFaq === faq.id ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                                        </button>
                                        {openFaq === faq.id && (
                                            <p className="text-sm text-gray-600 pb-2 pr-8 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Case Types</h4>
                            <div className="space-y-2">
                                {caseTypes.map((faq) => (
                                    <div key={faq.id} className="border-b border-gray-100 last:border-0 pb-2">
                                        <button className="w-full flex justify-between items-center py-2 text-left hover:text-gray-600 transition-colors">
                                            <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                                            <ChevronDown className="h-4 w-4 text-gray-400" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Platform Usage</h4>
                            <div className="space-y-2">
                                {platformUsage.map((faq) => (
                                    <div key={faq.id} className="border-b border-gray-100 last:border-0 pb-2">
                                        <button className="w-full flex justify-between items-center py-2 text-left hover:text-gray-600 transition-colors">
                                            <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                                            <ChevronDown className="h-4 w-4 text-gray-400" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Legal Guides Section */}
                <Card className="p-6">
                    <div className="mb-6">
                        <h3 className="font-semibold">Legal Guides</h3>
                        <p className="text-sm text-muted-foreground">Comprehensive guides on various legal topics</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {legalGuides.map((guide, index) => (
                            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer flex gap-4">
                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                    <BookOpen className="h-5 w-5 text-gray-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm text-gray-900">{guide.title}</h4>
                                    <span className="inline-block bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full mt-1 mb-1">
                                        {guide.category}
                                    </span>
                                    <p className="text-xs text-gray-500 leading-relaxed">{guide.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}

function SearchIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    );
}
