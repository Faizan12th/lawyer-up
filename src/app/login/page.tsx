'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Scale, User, Building2, ShieldCheck, Gavel } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type UserRole = 'client' | 'lawyer' | 'firm' | 'admin';

export default function LoginPage() {
    const router = useRouter();
    const [role, setRole] = useState<UserRole>('client');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Redirect based on role from response, or fallback to selected role
            // Ideally the backend returns the role, and we should use that.
            // My login API returns user object with role.
            const userRole = data.user.role;

            // Optional: Check if selected role matches user role
            if (userRole !== 'law_firm' && userRole !== role) {
                // Allow law_firm to login as firm
                if (role === 'firm' && userRole === 'law_firm') {
                    // ok
                } else {
                    // Just a warning or auto-correct? Let's just redirect based on actual user role
                }
            }

            switch (userRole) {
                case 'client':
                    router.push('/client/dashboard');
                    break;
                case 'lawyer':
                    router.push('/lawyer/dashboard');
                    break;
                case 'law_firm':
                    router.push('/firm/dashboard');
                    break;
                case 'admin':
                    router.push('/admin/dashboard');
                    break;
                default:
                    router.push('/');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const roles = [
        { id: 'client', label: 'Client', icon: User },
        { id: 'lawyer', label: 'Lawyer', icon: Gavel },
        { id: 'firm', label: 'Law Firm', icon: Building2 },
        { id: 'admin', label: 'Admin', icon: ShieldCheck },
    ] as const;

    return (
        <div className="min-h-screen bg-[#F5F5F0] flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between px-8 py-6">
                <Link href="/" className="flex items-center gap-2">
                    <Scale className="h-6 w-6 text-gray-700" />
                    <span className="text-xl font-bold text-gray-700">LawyerUP</span>
                </Link>
                <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                    Back to Home
                </Link>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8 sm:p-10">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-gray-600">
                            Please select your role and sign in
                        </p>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-8">
                        {roles.map((r) => {
                            const Icon = r.icon;
                            const isSelected = role === r.id;
                            return (
                                <button
                                    key={r.id}
                                    onClick={() => setRole(r.id)}
                                    className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${isSelected
                                        ? 'border-gray-900 bg-gray-50 text-gray-900'
                                        : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <Icon className={`h-6 w-6 mb-1 ${isSelected ? 'text-gray-900' : 'text-gray-400'}`} />
                                    <span className="text-xs font-medium">{r.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-lg">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex items-center justify-end">
                            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                                Forgot Password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-lg py-2.5 text-sm font-medium transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Signing in...' : `Sign In as ${roles.find(r => r.id === role)?.label}`}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-600">Don't have an account? </span>
                        <Link href="/get-started" className="font-medium text-gray-900 hover:underline">
                            Create Account
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
