'use client';

import React, { useState, useEffect } from 'react';
// import { Topbar } from '@/components/dashboard/Topbar';
import { Card } from '@/components/ui/Card';
import { Star, ThumbsUp, MessageCircle, User, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ReviewsPage() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState([
        { label: 'Average Rating', value: '0.0', icon: Star, color: 'text-yellow-400', subtext: 'Out of 5.0' },
        { label: 'Total Reviews', value: '0', icon: MessageCircle, color: 'text-blue-500', subtext: 'All time' },
        { label: '5-Star Reviews', value: '0', icon: Star, color: 'text-yellow-400', subtext: '0% of total' },
        { label: 'Client Satisfaction', value: '0%', icon: ThumbsUp, color: 'text-green-500', subtext: 'Positive feedback' },
    ]);
    const [ratingDistribution, setRatingDistribution] = useState([
        { stars: 5, count: 0, percentage: 0 },
        { stars: 4, count: 0, percentage: 0 },
        { stars: 3, count: 0, percentage: 0 },
        { stars: 2, count: 0, percentage: 0 },
        { stars: 1, count: 0, percentage: 0 },
    ]);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/reviews');
            const data = await res.json();
            if (res.ok) {
                const fetchedReviews = data.data || [];
                setReviews(fetchedReviews);
                calculateStats(fetchedReviews);
            } else {
                toast.error('Failed to fetch reviews');
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
            toast.error('Failed to load reviews');
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (reviewsData: any[]) => {
        const total = reviewsData.length;
        if (total === 0) return;

        const sumRating = reviewsData.reduce((acc, r) => acc + r.rating, 0);
        const avgRating = (sumRating / total).toFixed(1);

        const fiveStarCount = reviewsData.filter(r => r.rating === 5).length;
        const fiveStarPercent = Math.round((fiveStarCount / total) * 100);

        const positiveCount = reviewsData.filter(r => r.rating >= 4).length;
        const satisfaction = Math.round((positiveCount / total) * 100);

        // Distribution
        const dist = [5, 4, 3, 2, 1].map(star => {
            const count = reviewsData.filter(r => r.rating === star).length;
            const percentage = Math.round((count / total) * 100);
            return { stars: star, count, percentage };
        });

        setStats([
            { label: 'Average Rating', value: avgRating, icon: Star, color: 'text-yellow-400', subtext: 'Out of 5.0' },
            { label: 'Total Reviews', value: total.toString(), icon: MessageCircle, color: 'text-blue-500', subtext: 'All time' },
            { label: '5-Star Reviews', value: fiveStarCount.toString(), icon: Star, color: 'text-yellow-400', subtext: `${fiveStarPercent}% of total` },
            { label: 'Client Satisfaction', value: `${satisfaction}%`, icon: ThumbsUp, color: 'text-green-500', subtext: 'Positive feedback' },
        ]);

        setRatingDistribution(dist);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin text-gray-900" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pb-8">
            {/* Topbar removed */}

            <div className="px-6 py-6 space-y-6">
                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <Card key={index} className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                                {index === 0 && <stat.icon className={`h-4 w-4 ${stat.color} fill-current`} />}
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-bold">{stat.value}</span>
                                {index === 0 && <Star className="h-6 w-6 text-yellow-400 fill-yellow-400 mb-1" />}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{stat.subtext}</p>
                        </Card>
                    ))}
                </div>

                {/* Rating Distribution */}
                <Card className="p-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold">Rating Distribution</h3>
                        <p className="text-sm text-muted-foreground">Breakdown of your client ratings</p>
                    </div>
                    <div className="space-y-4">
                        {ratingDistribution.map((item) => (
                            <div key={item.stars} className="flex items-center gap-4">
                                <div className="flex items-center gap-1 w-12">
                                    <span className="text-sm font-medium">{item.stars}</span>
                                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                </div>
                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-yellow-400 rounded-full"
                                        style={{ width: `${item.percentage}%` }}
                                    ></div>
                                </div>
                                <div className="w-20 text-right text-sm text-muted-foreground">
                                    {item.count} ({item.percentage}%)
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Recent Reviews */}
                <Card className="p-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold">Recent Client Reviews</h3>
                        <p className="text-sm text-muted-foreground">What your clients are saying</p>
                    </div>
                    <div className="space-y-6">
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <div key={review._id} className="border p-4 rounded-lg bg-white">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                                                {review.client?.image ? (
                                                    <img src={review.client.image} alt={review.client.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <User className="h-5 w-5 text-gray-600" />
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">{review.client?.name || 'Anonymous'}</h4>
                                                {/* Case Type is not in Review model currently, omitting or using placeholder if needed */}
                                                {/* <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 mt-1">
                                                    {review.caseType}
                                                </span> */}
                                            </div>
                                        </div>
                                        <span className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                No reviews yet.
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
