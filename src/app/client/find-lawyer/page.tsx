'use client';

import React, { useState, useEffect } from 'react';
// import { Topbar } from '@/components/dashboard/Topbar';
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
import { LawyerCard } from '@/components/client/LawyerCard';

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
            {/* Topbar removed */}

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
                                <LawyerCard key={profile._id} profile={profile} />
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
