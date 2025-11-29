'use client';

import React, { useState, useEffect } from 'react';
import { Topbar } from '@/components/dashboard/Topbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    Search,
    MapPin,
    Briefcase,
    DollarSign,
    Star,
    User,
    Filter,
    Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function FindLawyerPage() {
    const [lawyers, setLawyers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        city: '',
        minExperience: '',
        maxFee: '',
    });

    const fetchLawyers = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (filters.category) queryParams.append('category', filters.category);
            if (filters.city) queryParams.append('city', filters.city);
            if (filters.minExperience) queryParams.append('minExperience', filters.minExperience);
            if (filters.maxFee) queryParams.append('maxFee', filters.maxFee);

            const res = await fetch(`/api/lawyers/search?${queryParams.toString()}`);
            const data = await res.json();
            if (res.ok) {
                setLawyers(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch lawyers', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLawyers();
    }, [filters]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pb-8">
            <Topbar title="Find a Lawyer" subtitle="Client Portal" />

            <div className="px-6 py-6 space-y-6">
                {/* Search and Filters */}
                <Card className="p-4">
                    <div className="grid gap-4 md:grid-cols-4">
                        <div className="relative">
                            <select
                                name="category"
                                value={filters.category}
                                onChange={handleFilterChange}
                                className="w-full pl-3 pr-8 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
                            >
                                <option value="">All Categories</option>
                                <option value="Criminal Law">Criminal Law</option>
                                <option value="Family Law">Family Law</option>
                                <option value="Corporate Law">Corporate Law</option>
                                <option value="Civil Law">Civil Law</option>
                            </select>
                        </div>
                        <div className="relative">
                            <select
                                name="city"
                                value={filters.city}
                                onChange={handleFilterChange}
                                className="w-full pl-3 pr-8 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
                            >
                                <option value="">All Cities</option>
                                <option value="Lahore">Lahore</option>
                                <option value="Karachi">Karachi</option>
                                <option value="Islamabad">Islamabad</option>
                            </select>
                        </div>
                        <div className="relative">
                            <select
                                name="minExperience"
                                value={filters.minExperience}
                                onChange={handleFilterChange}
                                className="w-full pl-3 pr-8 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
                            >
                                <option value="">Any Experience</option>
                                <option value="1">1+ Years</option>
                                <option value="5">5+ Years</option>
                                <option value="10">10+ Years</option>
                            </select>
                        </div>
                        <div className="relative">
                            <select
                                name="maxFee"
                                value={filters.maxFee}
                                onChange={handleFilterChange}
                                className="w-full pl-3 pr-8 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
                            >
                                <option value="">Any Fee</option>
                                <option value="5000">Up to 5000</option>
                                <option value="10000">Up to 10000</option>
                                <option value="20000">Up to 20000</option>
                            </select>
                        </div>
                    </div>
                </Card>

                {/* Lawyer Grid */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {lawyers.length > 0 ? (
                            lawyers.map((profile) => (
                                <Card key={profile._id} className="p-6 flex flex-col">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                            {profile.user.image ? (
                                                <img src={profile.user.image} alt={profile.user.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <User className="h-7 w-7 text-gray-600" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">{profile.user.name}</h3>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {profile.specializations.map((spec: string, idx: number) => (
                                                    <span key={idx} className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                        {spec}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                        <span className="font-bold text-sm text-yellow-600">4.8</span>
                                        <span className="text-sm text-muted-foreground">(12 reviews)</span>
                                    </div>

                                    <div className="space-y-2 text-sm text-muted-foreground mb-6 flex-1">
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="h-4 w-4" />
                                            <span>{profile.experience} years experience</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            <span>{profile.city}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4" />
                                            <span>PKR {profile.consultationFee}/consultation</span>
                                        </div>
                                    </div>

                                    <Link href={`/client/lawyers/${profile.user._id}`}>
                                        <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                                            View Profile
                                        </Button>
                                    </Link>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 text-gray-500">
                                No lawyers found matching your criteria.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
