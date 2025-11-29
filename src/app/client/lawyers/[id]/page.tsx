'use client';

import React, { useState, useEffect } from 'react';
// import { Topbar } from '@/components/dashboard/Topbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    MapPin,
    Briefcase,
    DollarSign,
    Star,
    User,
    Calendar,
    Clock,
    MessageSquare,
    Loader2,
    X
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export default function LawyerProfilePage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;

    const [lawyer, setLawyer] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [bookingOpen, setBookingOpen] = useState(false);
    const [reviewOpen, setReviewOpen] = useState(false);
    const [bookingData, setBookingData] = useState({
        date: '',
        startTime: '',
        endTime: '',
        notes: '',
    });
    const [reviewData, setReviewData] = useState({
        rating: 5,
        comment: '',
    });
    const [bookingLoading, setBookingLoading] = useState(false);
    const [reviewLoading, setReviewLoading] = useState(false);

    const fetchLawyer = async () => {
        try {
            const res = await fetch(`/api/lawyers/${id}`);
            const data = await res.json();
            if (res.ok) {
                setLawyer(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch lawyer details', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchLawyer();
        }
    }, [id]);

    const handleBookingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setBookingLoading(true);
        try {
            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lawyerId: id,
                    ...bookingData,
                    type: 'consultation',
                }),
            });

            if (res.ok) {
                alert('Appointment requested successfully!');
                setBookingOpen(false);
                router.push('/client/appointments');
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to book appointment');
            }
        } catch (error) {
            console.error('Booking failed', error);
            alert('Booking failed');
        } finally {
            setBookingLoading(false);
        }
    };

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setReviewLoading(true);
        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lawyerId: id,
                    ...reviewData,
                }),
            });

            if (res.ok) {
                alert('Review submitted successfully!');
                setReviewOpen(false);
                setReviewData({ rating: 5, comment: '' });
                fetchLawyer(); // Refresh reviews
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to submit review');
            }
        } catch (error) {
            console.error('Review submission failed', error);
            alert('Review submission failed');
        } finally {
            setReviewLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    if (!lawyer) {
        return (
            <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
                <p className="text-gray-500">Lawyer not found</p>
            </div>
        );
    }

    const { user, profile, reviews } = lawyer;

    return (
        <div className="min-h-screen bg-gray-50/50 pb-8">
            {/* Topbar removed */}

            <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
                {/* Profile Header */}
                <Card className="p-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="h-32 w-32 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden border-4 border-white shadow-sm">
                            {user.image ? (
                                <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                            ) : (
                                <User className="h-16 w-16 text-gray-400" />
                            )}
                        </div>
                        <div className="flex-1 space-y-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {profile.specializations.map((spec: string, idx: number) => (
                                        <span key={idx} className="inline-flex items-center rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="h-4 w-4" />
                                    <span>{profile.experience} Years Experience</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{profile.city}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    <span>PKR {profile.consultationFee}/hr</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                    <span className="font-medium text-gray-900">
                                        {reviews.length > 0
                                            ? (reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / reviews.length).toFixed(1)
                                            : 'N/A'}
                                    </span>
                                    <span>({reviews.length} Reviews)</span>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <Button onClick={() => setBookingOpen(true)} className="bg-gray-900 hover:bg-gray-800 text-white">
                                    Book Appointment
                                </Button>
                                <Button variant="outline" className="border-gray-300">
                                    Message
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Left Column - Bio & Info */}
                    <div className="md:col-span-2 space-y-6">
                        <Card className="p-6">
                            <h2 className="text-lg font-bold mb-4">About</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {profile.bio || 'No biography available.'}
                            </p>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold">Reviews</h2>
                                <Button variant="outline" size="sm" onClick={() => setReviewOpen(true)}>
                                    Write a Review
                                </Button>
                            </div>
                            <div className="space-y-6">
                                {reviews.length > 0 ? (
                                    reviews.map((review: any) => (
                                        <div key={review._id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                        <User className="h-4 w-4 text-gray-500" />
                                                    </div>
                                                    <span className="font-medium text-sm">{review.client?.name || 'Anonymous'}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                                                    <span className="text-sm font-medium">{review.rating}</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600">{review.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-sm">No reviews yet.</p>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Right Column - Availability & Stats */}
                    <div className="space-y-6">
                        <Card className="p-6">
                            <h2 className="text-lg font-bold mb-4">Availability</h2>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <Clock className="h-4 w-4" />
                                    <span>{profile.availability || 'Not specified'}</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {bookingOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <Card className="w-full max-w-md p-6 bg-white relative">
                        <button onClick={() => setBookingOpen(false)} className="absolute top-4 right-4 rounded-full p-1 hover:bg-gray-100">
                            <X className="h-5 w-5" />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <input
                                    type="date"
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    value={bookingData.date}
                                    onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Start Time</label>
                                    <input
                                        type="time"
                                        required
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                        value={bookingData.startTime}
                                        onChange={(e) => setBookingData({ ...bookingData, startTime: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">End Time</label>
                                    <input
                                        type="time"
                                        required
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                        value={bookingData.endTime}
                                        onChange={(e) => setBookingData({ ...bookingData, endTime: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Notes</label>
                                <textarea
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    rows={3}
                                    placeholder="Briefly describe your case..."
                                    value={bookingData.notes}
                                    onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setBookingOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1 bg-gray-900 text-white" disabled={bookingLoading}>
                                    {bookingLoading ? 'Booking...' : 'Confirm Booking'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}

            {/* Review Modal */}
            {reviewOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                    <Card className="w-full max-w-md p-6 bg-white relative">
                        <button onClick={() => setReviewOpen(false)} className="absolute top-4 right-4 rounded-full p-1 hover:bg-gray-100">
                            <X className="h-5 w-5" />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Write a Review</h2>
                        <form onSubmit={handleReviewSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Rating</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setReviewData({ ...reviewData, rating: star })}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                className={`h-6 w-6 ${star <= reviewData.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Comment</label>
                                <textarea
                                    required
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                                    rows={4}
                                    placeholder="Share your experience..."
                                    value={reviewData.comment}
                                    onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setReviewOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1 bg-gray-900 text-white" disabled={reviewLoading}>
                                    {reviewLoading ? 'Submitting...' : 'Submit Review'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
}
