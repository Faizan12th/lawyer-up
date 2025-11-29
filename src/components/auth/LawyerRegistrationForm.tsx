'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Scale, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useRouter } from 'next/navigation';

export const LawyerRegistrationForm: React.FC = () => {
    const router = useRouter();
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        cnic: '',
        licenseNumber: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        practiceArea: '',
        experience: '',
        consultationFee: '',
        availability: '',
    });

    const [cnicFile, setCnicFile] = useState<File | null>(null);
    const [licenseFile, setLicenseFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cnic' | 'license') => {
        if (e.target.files && e.target.files[0]) {
            if (type === 'cnic') setCnicFile(e.target.files[0]);
            else setLicenseFile(e.target.files[0]);
        }
    };

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });
        if (!res.ok) throw new Error('File upload failed');
        return await res.json();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (!cnicFile || !licenseFile) {
            setError('Please upload both CNIC and License documents');
            setLoading(false);
            return;
        }

        try {
            // 1. Signup User
            const signupRes = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    role: 'lawyer',
                }),
            });
            const signupData = await signupRes.json();
            if (!signupRes.ok) throw new Error(signupData.error || 'Signup failed');

            // 2. Upload Documents
            const cnicUpload = await uploadFile(cnicFile);
            const licenseUpload = await uploadFile(licenseFile);

            // 3. Create Profile
            const profileRes = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone: formData.phone,
                    cnic: formData.cnic,
                    licenseNumber: formData.licenseNumber,
                    specializations: formData.practiceArea.split(',').map(s => s.trim()).filter(s => s),
                    experience: parseInt(formData.experience) || 0,
                    consultationFee: parseInt(formData.consultationFee) || 0,
                    availability: formData.availability,
                }),
            });
            if (!profileRes.ok) throw new Error('Failed to create profile');

            // 4. Save Verification Documents (We need an API for this, but for now let's assume profile update is enough or we create a separate API)
            // I'll create a separate API call for verification docs if needed, but for now let's skip explicit VerificationDocument creation 
            // and assume Admin checks the profile or we add a specific route for it.
            // Actually, I should create the verification documents.

            await fetch('/api/users/verification-documents', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    documents: [
                        { type: 'cnic', url: cnicUpload.data.secure_url, publicId: cnicUpload.data.public_id },
                        { type: 'license', url: licenseUpload.data.secure_url, publicId: licenseUpload.data.public_id },
                    ]
                }),
            });

            // Redirect to dashboard (which will show "Verification in Progress")
            router.push('/lawyer/dashboard');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="border-b border-border bg-background py-4">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <Scale className="h-6 w-6" />
                            <span className="text-xl font-bold">LawyerUP</span>
                        </Link>
                        <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 py-12 px-4">
                <Card className="mx-auto w-full max-w-3xl p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-foreground mb-2">Lawyer Registration</h1>
                        <p className="text-sm text-muted-foreground">
                            Complete your profile to get verified and start practicing on LawyerUP
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-500 text-sm rounded-lg">
                            {error}
                        </div>
                    )}

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {/* Personal Information */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">CNIC *</label>
                                    <input type="text" name="cnic" value={formData.cnic} onChange={handleChange} required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="12345-1234567-1" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">License Number *</label>
                                    <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="LAW-12345" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="+92 300 1234567" />
                                </div>
                            </div>
                        </div>

                        {/* Account Information */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Account Information</h3>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email *</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="lawyer@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Password *</label>
                                    <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="••••••••" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Confirm Password *</label>
                                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="••••••••" />
                                </div>
                            </div>
                        </div>

                        {/* Professional Information */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Specializations (comma separated) *</label>
                                    <input
                                        type="text"
                                        name="practiceArea"
                                        value={formData.practiceArea}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        placeholder="Criminal Law, Civil Law, Corporate Law"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Years of Experience *</label>
                                    <input
                                        type="number"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        placeholder="e.g. 5"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Consultation Fee (PKR) *</label>
                                    <input type="number" name="consultationFee" value={formData.consultationFee} onChange={handleChange} required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="5000" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Availability *</label>
                                    <select name="availability" value={formData.availability} onChange={handleChange} required className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="">Select availability</option>
                                        <option value="Full Time">Full Time</option>
                                        <option value="Part Time">Part Time</option>
                                        <option value="Weekends Only">Weekends Only</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Document Verification */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Document Verification</h3>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Upload CNIC *</label>
                                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-6 hover:bg-accent/50 cursor-pointer transition-colors relative">
                                        <input type="file" accept="image/*,application/pdf" onChange={(e) => handleFileChange(e, 'cnic')} className="absolute inset-0 opacity-0 cursor-pointer" required />
                                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                        <span className="text-sm text-muted-foreground">{cnicFile ? cnicFile.name : 'Click to upload CNIC'}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Upload License Document *</label>
                                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-6 hover:bg-accent/50 cursor-pointer transition-colors relative">
                                        <input type="file" accept="image/*,application/pdf" onChange={(e) => handleFileChange(e, 'license')} className="absolute inset-0 opacity-0 cursor-pointer" required />
                                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                        <span className="text-sm text-muted-foreground">{licenseFile ? licenseFile.name : 'Click to upload License'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="terms"
                                className="rounded border-gray-300"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                            />
                            <label htmlFor="terms" className="text-sm text-muted-foreground">
                                I agree to the platform policies and terms of service
                            </label>
                        </div>

                        <Button type="submit" className="w-full" disabled={!agreed || loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit for Verification'
                            )}
                        </Button>
                    </form>
                </Card>
            </main>
        </div>
    );
};
