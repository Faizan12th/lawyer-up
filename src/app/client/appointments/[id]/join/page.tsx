'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
// import { Topbar } from '@/components/dashboard/Topbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Mic, MicOff, Video, VideoOff, PhoneOff, User, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VideoCallPage() {
    const params = useParams();
    const router = useRouter();
    const [appointment, setAppointment] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [micOn, setMicOn] = useState(true);
    const [videoOn, setVideoOn] = useState(true);
    const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const res = await fetch(`/api/appointments/${params.id}`);
                const data = await res.json();
                if (res.ok) {
                    setAppointment(data.data);
                    // Simulate connection delay
                    setTimeout(() => setCallStatus('connected'), 2000);
                } else {
                    toast.error('Failed to load appointment details');
                    router.push('/client/appointments');
                }
            } catch (error) {
                console.error('Failed to fetch appointment', error);
                toast.error('Failed to load appointment details');
                router.push('/client/appointments');
            } finally {
                setLoading(false);
            }
        };
        fetchAppointment();
    }, [params.id, router]);

    const handleEndCall = () => {
        setCallStatus('ended');
        toast.success('Call ended');
        setTimeout(() => router.push('/client/appointments'), 1000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Initializing secure connection...</span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            {/* Header */}
            <div className="bg-gray-800 p-4 flex justify-between items-center text-white">
                <div>
                    <h2 className="font-semibold">{appointment?.lawyer?.name || 'Lawyer'}</h2>
                    <p className="text-xs text-gray-400">{callStatus === 'connected' ? 'Connected' : 'Connecting...'}</p>
                </div>
                <div className="text-sm bg-gray-700 px-3 py-1 rounded-full">
                    {appointment?.startTime} - {appointment?.endTime}
                </div>
            </div>

            {/* Main Video Area */}
            <div className="flex-1 relative flex items-center justify-center p-4">
                {/* Remote Video (Placeholder) */}
                <div className="w-full h-full max-w-4xl bg-gray-800 rounded-xl overflow-hidden relative flex items-center justify-center">
                    {callStatus === 'connected' ? (
                        <div className="text-center">
                            <div className="h-32 w-32 rounded-full bg-gray-700 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                                {appointment?.lawyer?.image ? (
                                    <img src={appointment.lawyer.image} alt="Lawyer" className="h-full w-full object-cover" />
                                ) : (
                                    <User className="h-16 w-16 text-gray-500" />
                                )}
                            </div>
                            <h3 className="text-2xl font-semibold text-white">{appointment?.lawyer?.name}</h3>
                            <p className="text-gray-400">Consultation in progress...</p>
                        </div>
                    ) : (
                        <div className="text-center text-gray-400">
                            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
                            <p>Waiting for lawyer to join...</p>
                        </div>
                    )}

                    {/* Local Video (PIP) */}
                    <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-900 rounded-lg border-2 border-gray-700 flex items-center justify-center overflow-hidden">
                        {videoOn ? (
                            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                <User className="h-12 w-12 text-gray-600" />
                            </div>
                        ) : (
                            <div className="w-full h-full bg-black flex items-center justify-center">
                                <VideoOff className="h-8 w-8 text-red-500" />
                            </div>
                        )}
                        <span className="absolute bottom-1 left-2 text-xs text-white bg-black/50 px-1 rounded">You</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-gray-800 p-6 flex justify-center gap-6">
                <button
                    onClick={() => setMicOn(!micOn)}
                    className={`p-4 rounded-full transition-colors ${micOn ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                >
                    {micOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
                </button>
                <button
                    onClick={() => setVideoOn(!videoOn)}
                    className={`p-4 rounded-full transition-colors ${videoOn ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                >
                    {videoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
                </button>
                <button
                    onClick={handleEndCall}
                    className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
                >
                    <PhoneOff className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
}
