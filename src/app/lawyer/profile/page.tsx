'use client';

import React, { useState, useEffect } from 'react';
// import { Topbar } from '@/components/dashboard/Topbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader2, Upload, User } from 'lucide-react';

export default function LawyerProfile() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        city: '',
        address: '',
        bio: '',
        specializations: '',
        experience: 0,
        consultationFee: 0,
        availability: '',
        image: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/users/profile');
                const data = await res.json();
                if (res.ok && data.data) {
                    setFormData({
                        name: data.data.name || '', // This might need to come from User model if not in Profile
                        phone: data.data.phone || '',
                        city: data.data.city || '',
                        address: data.data.address || '',
                        bio: data.data.bio || '',
                        specializations: data.data.specializations ? data.data.specializations.join(', ') : '',
                        experience: data.data.experience || 0,
                        consultationFee: data.data.consultationFee || 0,
                        availability: data.data.availability || '',
                        image: data.data.image || '',
                    });
                }
                // Also fetch user details for name/email if needed, but Profile API might be enough if updated
            } catch (error) {
                console.error('Failed to fetch profile', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: uploadData,
            });
            const data = await res.json();
            if (res.ok) {
                setFormData({ ...formData, image: data.url });
            } else {
                alert('Image upload failed');
            }
        } catch (error) {
            console.error('Image upload error', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = {
                ...formData,
                specializations: formData.specializations.split(',').map(s => s.trim()).filter(s => s),
            };

            const res = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                alert('Profile updated successfully');
            } else {
                alert('Failed to update profile');
            }
        } catch (error) {
            console.error('Failed to update profile', error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pb-8">
            {/* Topbar removed */}

            <div className="max-w-4xl mx-auto px-6 py-8">
                <Card className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Profile Image */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="h-32 w-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-sm relative group">
                                {formData.image ? (
                                    <img src={formData.image} alt="Profile" className="h-full w-full object-cover" />
                                ) : (
                                    <User className="h-16 w-16 text-gray-400" />
                                )}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <Upload className="h-8 w-8 text-white" />
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            <p className="text-sm text-muted-foreground">Click to upload new picture</p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Professional Bio</label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    placeholder="Tell clients about your experience and expertise..."
                                />
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Specializations (comma separated)</label>
                                    <input
                                        type="text"
                                        name="specializations"
                                        value={formData.specializations}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        placeholder="e.g. Criminal, Family, Corporate"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Years of Experience</label>
                                    <input
                                        type="number"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Consultation Fee (PKR)</label>
                                    <input
                                        type="number"
                                        name="consultationFee"
                                        value={formData.consultationFee}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Availability</label>
                                    <input
                                        type="text"
                                        name="availability"
                                        value={formData.availability}
                                        onChange={handleChange}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        placeholder="e.g. Mon-Fri, 9AM-5PM"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={saving} className="min-w-[150px]">
                                {saving ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}
