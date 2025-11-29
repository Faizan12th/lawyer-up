'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { User, Loader2 } from 'lucide-react';

export function ProfileSettings() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        address: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/users/profile');
                const data = await res.json();
                if (res.ok && data.data) {
                    const { user, ...profile } = data.data;
                    setFormData({
                        name: user.name || '',
                        email: user.email || '',
                        phone: profile.phone || '',
                        city: profile.city || '',
                        address: profile.address || '',
                    });
                }
            } catch (error) {
                console.error('Failed to fetch profile', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone: formData.phone,
                    city: formData.city,
                    address: formData.address,
                }),
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
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center gap-4 mb-8">
                <User className="h-5 w-5 text-gray-900" />
                <div>
                    <h3 className="font-semibold text-lg">Personal Information</h3>
                    <p className="text-sm text-muted-foreground">Update your personal details</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        disabled
                        className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                    >
                        <option value="">Select City</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Islamabad">Islamabad</option>
                    </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 h-24 resize-none"
                    />
                </div>
            </div>

            <div className="flex justify-end mt-8">
                <Button onClick={handleSubmit} disabled={saving} className="bg-gray-900 hover:bg-gray-800 text-white">
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
        </div>
    );
}
