import React from 'react';
import Link from 'next/link';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
    return (
        <section className="bg-background py-20 text-center md:py-32">
            <Container>
                <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                    Empowering Legal Intelligence with AI
                </h1>
                <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
                    The all-in-one platform connecting lawyers, clients, and law firms with cutting-edge AI technology for seamless legal services and case management.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link href="/get-started">
                        <Button size="lg">Get Started</Button>
                    </Link>
                    <Link href="/login">
                        <Button variant="outline" size="lg">Login</Button>
                    </Link>
                    <Button variant="ghost" size="lg">Learn More</Button>
                </div>
            </Container>
        </section>
    );
};
