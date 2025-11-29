import React from 'react';
import Link from 'next/link';
import { Scale } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface LoginFormProps {
    role: string;
    onSubmit?: (e: React.FormEvent) => void;
    registerPath: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ role, onSubmit, registerPath }) => {
    return (
        <Card className="w-full max-w-md p-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-2">{role} Login</h1>
                <p className="text-sm text-muted-foreground">
                    Enter your credentials to access your account
                </p>
            </div>

            <form className="space-y-6" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="your.email@example.com"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="••••••••"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <Link href="#" className="text-sm font-medium text-primary hover:underline">
                        Forgot Password?
                    </Link>
                </div>

                <Button type="submit" className="w-full">
                    Sign In
                </Button>
            </form>

            <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <Link href={registerPath} className="font-medium text-primary hover:underline">
                    Create Account
                </Link>
            </div>
        </Card>
    );
};
