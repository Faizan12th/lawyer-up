'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Search, Star, Flag, Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { StatsCard } from '@/components/admin/StatsCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function FeedbackMonitoringPage() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch('/api/reviews');
                const data = await res.json();
                if (res.ok) {
                    setReviews(data.data || []);
                } else {
                    toast.error(data.error || 'Failed to fetch reviews');
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
                toast.error('Failed to load reviews');
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    const filteredReviews = reviews.filter(r =>
        (r.client?.name || 'Anonymous').toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.lawyer?.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate Stats
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
        ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
        : '0.0';
    const fiveStarReviews = reviews.filter(r => r.rating === 5).length;
    const fiveStarPercentage = totalReviews > 0 ? Math.round((fiveStarReviews / totalReviews) * 100) : 0;
    // Placeholder for reported reviews since we don't have a 'reported' field in schema yet, 
    // but we can simulate or add it later. For now, 0.
    const reportedReviews = 0;

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-900" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">Feedback Monitoring</h2>
                    <p className="text-sm text-gray-500">Monitor and manage client reviews</p>
                </div>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search reviews..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid gap-6 md:grid-cols-4">
                <StatsCard
                    title="Total Reviews"
                    value={totalReviews.toString()}
                    change=""
                    trend="neutral"
                    icon={MessageSquare}
                    subtext="All time"
                />
                <StatsCard
                    title="Average Rating"
                    value={averageRating}
                    change=""
                    trend="neutral"
                    icon={Star}
                    subtext="Out of 5.0"
                />
                <StatsCard
                    title="Reported Reviews"
                    value={reportedReviews.toString()}
                    change="Requires attention"
                    trend="neutral"
                    icon={Flag}
                    subtext="Pending action"
                />
                <StatsCard
                    title="5-Star Reviews"
                    value={fiveStarReviews.toString()}
                    change={`${fiveStarPercentage}% of total`}
                    trend="neutral"
                    icon={Star}
                    subtext="Highest rating"
                />
            </div>

            {/* Main Content Card */}
            <Card className="bg-white border-none shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="font-semibold text-lg text-gray-900">All Reviews</h3>
                    <p className="text-sm text-gray-500">Client feedback and ratings</p>
                </div>

                <div className="divide-y divide-gray-50">
                    {filteredReviews.length > 0 ? (
                        filteredReviews.map((review) => (
                            <div key={review._id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                                            {review.client?.name?.charAt(0) || '?'}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-medium text-gray-900">{review.client?.name || 'Anonymous'}</h4>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                Review for <span className="font-medium text-gray-700">{review.lawyer?.name || 'Unknown Lawyer'}</span>
                                            </p>

                                            <div className="flex items-center gap-1 mt-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${i < Math.floor(review.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                                                    />
                                                ))}
                                                <span className="text-sm text-gray-600 ml-1">{review.rating.toFixed(1)}</span>
                                            </div>

                                            <p className="text-sm text-gray-700 mt-2 leading-relaxed max-w-2xl">
                                                {review.comment}
                                            </p>

                                            <p className="text-xs text-gray-400 mt-3">Posted on {new Date(review.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" className="h-8 border-gray-200 text-gray-600 hover:bg-gray-50">
                                            <Flag className="h-4 w-4 mr-2" /> Report
                                        </Button>
                                        <Button size="sm" variant="outline" className="h-8 border-gray-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-100">
                                            <Trash2 className="h-4 w-4 mr-2" /> Remove
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No reviews found matching your search.
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
