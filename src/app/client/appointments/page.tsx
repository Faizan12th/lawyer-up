'use client';

import React, { useState, useEffect } from 'react';
import { Topbar } from '@/components/dashboard/Topbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
    Calendar,
    Clock,
    Video,
    MessageSquare,
    User,
    ArrowLeft,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ClientAppointmentsPage() {
    const [activeTab, setActiveTab] = useState<'requested' | 'scheduled' | 'past'>('scheduled');
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Review Modal State
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submittingReview, setSubmittingReview] = useState(false);

    const fetchAppointments = async () => {
        try {
            const res = await fetch('/api/appointments');
            const data = await res.json();
            if (res.ok) {
                setAppointments(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch appointments', error);
            toast.error('Failed to fetch appointments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        if (!confirm(`Are you sure you want to ${newStatus} this appointment?`)) return;

        try {
            const res = await fetch(`/api/appointments/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                toast.success(`Appointment ${newStatus} successfully`);
                fetchAppointments();
            } else {
                toast.error('Failed to update appointment status');
            }
        } catch (error) {
            console.error('Failed to update status', error);
            toast.error('An error occurred while updating status');
        }
    };

    const openReviewModal = (appointment: any) => {
        setSelectedAppointment(appointment);
        setRating(0);
        setComment('');
        setIsReviewModalOpen(true);
    };

    const handleSubmitReview = async () => {
        if (!rating) {
            toast.error('Please select a rating');
            return;
        }
        if (!comment.trim()) {
            toast.error('Please enter a comment');
            return;
        }

        try {
            setSubmittingReview(true);
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lawyerId: selectedAppointment.lawyer._id,
                    appointmentId: selectedAppointment._id,
                    rating,
                    comment
                }),
            });

            if (res.ok) {
                toast.success('Review submitted successfully');
                setIsReviewModalOpen(false);

                // If appointment was not completed, mark it as completed now
                if (selectedAppointment.status !== 'completed') {
                    await handleStatusUpdate(selectedAppointment._id, 'completed');
                } else {
                    fetchAppointments();
                }
            } else {
                const data = await res.json();
                toast.error(data.error || 'Failed to submit review');
            }
        } catch (error) {
            console.error('Failed to submit review', error);
            toast.error('An error occurred');
        } finally {
            setSubmittingReview(false);
        }
    };

    const requestedAppointments = appointments.filter(apt =>
        apt.status === 'requested' && new Date(apt.date) >= new Date()
    );

    const scheduledAppointments = appointments.filter(apt =>
        ['upcoming', 'confirmed'].includes(apt.status) && new Date(apt.date) >= new Date()
    );

    const pastAppointments = appointments.filter(apt =>
        ['completed', 'cancelled', 'rejected'].includes(apt.status) || new Date(apt.date) < new Date()
    );

    const stats = [
        { label: 'Requested', value: requestedAppointments.length },
        { label: 'Scheduled', value: scheduledAppointments.length },
        { label: 'Past', value: pastAppointments.length },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pb-8">
            <Topbar title="My Appointments" subtitle="Client Portal" />

            <div className="px-6 py-6 space-y-6">
                <div className="flex items-center gap-2 mb-2">
                    <Link href="/client/dashboard" className="text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                    <h2 className="text-xl font-semibold">My Appointments</h2>
                </div>
                <p className="text-sm text-muted-foreground -mt-4 mb-6 ml-6">View and manage your consultations with lawyers</p>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-3">
                    {stats.map((stat, index) => (
                        <Card key={index} className="p-6">
                            <p className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</p>
                            <div className="text-3xl font-bold">{stat.value}</div>
                        </Card>
                    ))}
                </div>

                {/* Appointments List */}
                <Card className="p-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold">Appointments</h3>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => setActiveTab('requested')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'requested'
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Requested
                        </button>
                        <button
                            onClick={() => setActiveTab('scheduled')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'scheduled'
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Scheduled
                        </button>
                        <button
                            onClick={() => setActiveTab('past')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === 'past'
                                ? 'bg-gray-900 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            Past
                        </button>
                    </div>

                    <div className="space-y-4">
                        {activeTab === 'requested' && (
                            requestedAppointments.length > 0 ? (
                                requestedAppointments.map((apt) => (
                                    <div key={apt._id} className="border rounded-lg p-6 bg-yellow-50/30">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                    {apt.lawyer?.image ? (
                                                        <img src={apt.lawyer.image} alt={apt.lawyer.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <User className="h-6 w-6 text-gray-600" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-lg">{apt.lawyer?.name || 'Unknown Lawyer'}</h4>
                                                    <p className="text-muted-foreground capitalize">{apt.type}</p>
                                                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="h-4 w-4" />
                                                            {new Date(apt.date).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            {apt.startTime} - {apt.endTime}
                                                        </div>
                                                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize bg-yellow-100 text-yellow-800">
                                                            {apt.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2 w-full md:w-auto">
                                                <button
                                                    onClick={() => handleStatusUpdate(apt._id, 'cancelled')}
                                                    className="text-red-600 text-sm hover:underline mt-1"
                                                >
                                                    Cancel Request
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 py-8">No requested appointments.</p>
                            )
                        )}

                        {activeTab === 'scheduled' && (
                            scheduledAppointments.length > 0 ? (
                                scheduledAppointments.map((apt) => (
                                    <div key={apt._id} className="border rounded-lg p-6">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                    {apt.lawyer?.image ? (
                                                        <img src={apt.lawyer.image} alt={apt.lawyer.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <User className="h-6 w-6 text-gray-600" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-lg">{apt.lawyer?.name || 'Unknown Lawyer'}</h4>
                                                    <p className="text-muted-foreground capitalize">{apt.type}</p>
                                                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="h-4 w-4" />
                                                            {new Date(apt.date).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            {apt.startTime} - {apt.endTime}
                                                        </div>
                                                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize bg-green-100 text-green-800">
                                                            {apt.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2 w-full md:w-auto">
                                                <Link href={`/client/appointments/${apt._id}/join`}>
                                                    <Button className="w-full md:w-auto bg-gray-900 hover:bg-gray-800 text-white gap-2">
                                                        <Video className="h-4 w-4" /> Join
                                                    </Button>
                                                </Link>
                                                <Link href={`/client/chat?userId=${apt.lawyer?._id}`}>
                                                    <Button variant="outline" className="w-full md:w-auto gap-2">
                                                        <MessageSquare className="h-4 w-4" /> Chat
                                                    </Button>
                                                </Link>
                                                <button
                                                    onClick={() => handleStatusUpdate(apt._id, 'cancelled')}
                                                    className="text-red-600 text-sm hover:underline mt-1"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 py-8">No scheduled appointments.</p>
                            )
                        )}

                        {activeTab === 'past' && (
                            pastAppointments.length > 0 ? (
                                pastAppointments.map((apt) => (
                                    <div key={apt._id} className="border rounded-lg p-6 bg-gray-50/50">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                            <div className="flex items-start gap-4">
                                                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                    {apt.lawyer?.image ? (
                                                        <img src={apt.lawyer.image} alt={apt.lawyer.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <User className="h-6 w-6 text-gray-600" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-lg">{apt.lawyer?.name || 'Unknown Lawyer'}</h4>
                                                    <p className="text-muted-foreground capitalize">{apt.type}</p>
                                                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="h-4 w-4" />
                                                            {new Date(apt.date).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            {apt.startTime}
                                                        </div>
                                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${apt.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                            apt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                                'bg-gray-200 text-gray-800'
                                                            }`}>
                                                            {apt.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2 w-full md:w-auto">
                                                {(apt.status === 'completed' || (apt.status === 'upcoming' && new Date(apt.date) < new Date())) && (
                                                    <Button
                                                        variant="outline"
                                                        className="w-full md:w-auto"
                                                        onClick={() => openReviewModal(apt)}
                                                    >
                                                        Leave Review
                                                    </Button>
                                                )}
                                                <Button variant="ghost" className="w-full md:w-auto">
                                                    View Details
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 py-8">No past appointments.</p>
                            )
                        )}
                    </div>
                </Card>
            </div>

            {/* Review Modal */}
            {isReviewModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                        <h3 className="text-lg font-semibold mb-4">Leave a Review</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            How was your experience with {selectedAppointment?.lawyer?.name}?
                        </p>

                        <div className="flex justify-center gap-2 mb-6">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none"
                                >
                                    <svg
                                        className={`w-8 h-8 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                                    </svg>
                                </button>
                            ))}
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                            <textarea
                                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-gray-900 focus:outline-none"
                                rows={4}
                                placeholder="Share your feedback..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setIsReviewModalOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                className="bg-gray-900 text-white hover:bg-gray-800"
                                onClick={handleSubmitReview}
                                disabled={submittingReview}
                            >
                                {submittingReview ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Submit Review'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
