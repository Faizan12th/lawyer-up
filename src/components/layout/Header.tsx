import React from 'react';
import Link from 'next/link';
import { Scale } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Scale className="h-6 w-6" />
                        <span className="text-xl font-bold">LawyerUP</span>
                    </div>
                    <nav className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
                            Login
                        </Link>
                        <Link href="/get-started">
                            <Button size="sm">Get Started</Button>
                        </Link>
                    </nav>
                </div>
            </Container>
        </header>
    );
};
