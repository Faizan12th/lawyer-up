'use client';

import React, { useState } from 'react';
import { X, Upload, Loader2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

interface AddCaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export const AddCaseModal: React.FC<AddCaseModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        court: '',
        description: '',
        caseNumber: '',
    });
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const uploadedDocs = [];
            if (files.length > 0) {
                setUploading(true);
                for (const file of files) {
                    const uploadData = new FormData();
                    uploadData.append('file', file);
                    const res = await fetch('/api/upload', {
                        method: 'POST',
                        body: uploadData,
                    });
                    const data = await res.json();
                    if (res.ok) {
                        uploadedDocs.push({
                            title: file.name,
                            url: data.url,
                            type: 'case_document',
                            uploadedAt: new Date(),
                        });
                    }
                }
                setUploading(false);
            }

            const payload = {
                ...formData,
                documents: uploadedDocs,
            };

            const res = await fetch('/api/cases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                toast.success('Case created successfully');
                onSuccess();
                onClose();
                setFormData({
                    title: '',
                    type: '',
                    court: '',
                    description: '',
                    caseNumber: '',
                });
                setFiles([]);
            } else {
                toast.error('Failed to create case');
            }
        } catch (error) {
            console.error('Failed to create case', error);
            toast.error('An error occurred while creating the case');
        } finally {
            setLoading(false);
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-2xl rounded-lg bg-background p-6 shadow-lg max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold">Add New Case</h2>
                        <p className="text-sm text-muted-foreground">Enter the details of the new case</p>
                    </div>
                    <button onClick={onClose} className="rounded-full p-1 hover:bg-accent">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Case Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Enter case title"
                        />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium mb-2">Case Type *</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="">Select type</option>
                                <option value="Criminal">Criminal</option>
                                <option value="Civil">Civil</option>
                                <option value="Corporate">Corporate</option>
                                <option value="Family">Family</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Court Type</label>
                            <select
                                name="court"
                                value={formData.court}
                                onChange={handleChange}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                <option value="">Select court</option>
                                <option value="Supreme Court">Supreme Court</option>
                                <option value="High Court">High Court</option>
                                <option value="District Court">District Court</option>
                                <option value="Family Court">Family Court</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Case Number</label>
                        <input
                            type="text"
                            name="caseNumber"
                            value={formData.caseNumber}
                            onChange={handleChange}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="e.g. C-2025-123"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Case Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]"
                            placeholder="Provide detailed case description..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Case Documents</label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                multiple
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">Click to upload case documents</p>
                            <p className="text-xs text-gray-400 mt-1">PDF, DOCX, JPG supported</p>
                        </div>
                        {files.length > 0 && (
                            <div className="mt-4 space-y-2">
                                {files.map((file, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                                        <FileText className="h-4 w-4" />
                                        <span className="truncate flex-1">{file.name}</span>
                                        <span className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
                        <Button type="submit" disabled={loading || uploading}>
                            {loading || uploading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {uploading ? 'Uploading...' : 'Creating...'}
                                </>
                            ) : (
                                'Add New Case'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
