import React from 'react';
import Link from 'next/link';
import { Scale, Users, Building2, Shield } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export interface Role {
    icon: React.ElementType;
    title: string;
    description: string;
    action: string;
    href?: string;
}

interface RoleSelectionProps {
    title: string;
    subtitle: string;
    roles: Role[];
    columns?: 3 | 4;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({
    title,
    subtitle,
    roles,
    columns = 3
}) => {
    return (
        <div className="min-h-screen bg-[#F5F5F0] flex flex-col">
            {/* Header - matching login page design */}
            <header className="flex items-center justify-between px-8 py-6">
                <Link href="/" className="flex items-center gap-2">
                    <Scale className="h-6 w-6 text-gray-700" />
                    <span className="text-xl font-bold text-gray-700">LawyerUP</span>
                </Link>
                <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                    Back
                </Link>
            </header>

            <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-7xl">
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                            {title}
                        </h1>
                        <p className="text-lg text-gray-600">
                            {subtitle}
                        </p>
                    </div>

                    <div className={`grid gap-8 justify-items-center ${columns === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
                        {roles.map((role, index) => (
                            <div key={index} className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center text-center transition-all hover:shadow-md">
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                                    <role.icon className="h-10 w-10 text-gray-700" />
                                </div>
                                <h2 className="mb-2 text-xl font-semibold text-gray-900">{role.title}</h2>
                                <p className="mb-8 text-sm text-gray-600 flex-1">
                                    {role.description}
                                </p>
                                {role.href ? (
                                    <Link href={role.href} className="w-full">
                                        <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-lg py-2.5 text-sm font-medium transition-colors">
                                            {role.action}
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-lg py-2.5 text-sm font-medium transition-colors">
                                        {role.action}
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};
