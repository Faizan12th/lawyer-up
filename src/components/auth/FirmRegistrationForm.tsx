'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Building2, Mail, Phone, MapPin, Upload, ArrowRight, Shield, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function FirmRegistrationForm() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        registrationNumber: '',
        address: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = async () => {
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: 'law_firm',
                    // Additional fields would be handled by a separate profile update or extended signup API
                    // For now, we register the user account. 
                    // Ideally, we should store phone, reg number, address in a FirmProfile model.
                    // But based on current signup API, it only takes name, email, password, role.
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Registration successful! Please login.');
                router.push('/login');
            } else {
                toast.error(data.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Register Law Firm</h2>
                    <p className="text-sm text-gray-600 mt-2">Create your firm account to manage lawyers and cases</p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-8 gap-2">
                    <div className={`h-2 w-2 rounded-full ${step >= 1 ? 'bg-gray-900' : 'bg-gray-200'}`} />
                    <div className={`h-1 w-8 rounded-full ${step >= 2 ? 'bg-gray-900' : 'bg-gray-200'}`} />
                    <div className={`h-2 w-2 rounded-full ${step >= 2 ? 'bg-gray-900' : 'bg-gray-200'}`} />
                    <div className={`h-1 w-8 rounded-full ${step >= 3 ? 'bg-gray-900' : 'bg-gray-200'}`} />
                    <div className={`h-2 w-2 rounded-full ${step >= 3 ? 'bg-gray-900' : 'bg-gray-200'}`} />
                </div>

                <form className="space-y-6">
                    {step === 1 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">Firm Name</label>
                                <div className="relative">
                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Legal Partners LLP"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">Official Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="contact@firm.com"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+92 300 1234567"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <Button type="button" onClick={nextStep} className="w-full bg-gray-900 hover:bg-gray-800 text-white group">
                                Next Step
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">Registration Number</label>
                                <div className="relative">
                                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="registrationNumber"
                                        value={formData.registrationNumber}
                                        onChange={handleChange}
                                        placeholder="Firm Registration No."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">Office Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Full office address"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all min-h-[100px] resize-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Button type="button" variant="outline" onClick={prevStep} className="w-full">
                                    Back
                                </Button>
                                <Button type="button" onClick={nextStep} className="w-full bg-gray-900 hover:bg-gray-800 text-white group">
                                    Next Step
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">Create Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-900">Upload Firm Logo</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-gray-900 transition-colors cursor-pointer">
                                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Button type="button" variant="outline" onClick={prevStep} className="w-full">
                                    Back
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                                >
                                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Complete Registration'}
                                </Button>
                            </div>
                        </div>
                    )}
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-gray-900 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
