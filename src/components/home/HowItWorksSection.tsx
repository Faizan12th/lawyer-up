import React from 'react';
import { Scale, Users, Building2 } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';

export const HowItWorksSection: React.FC = () => {
    const steps = [
        {
            icon: Scale,
            title: 'For Lawyers',
            description: 'Manage cases efficiently with AI-powered legal drafting, automated reminders, and streamlined client communication. Access comprehensive legal databases and analytics.',
        },
        {
            icon: Users,
            title: 'For Clients',
            description: 'Find verified lawyers, book consultations, track your cases, and get legal support all in one place. Transparent pricing and secure communication.',
        },
        {
            icon: Building2,
            title: 'For Law Firms',
            description: 'Centralize firm operations, assign cases to team members, track performance metrics, and manage billing efficiently with comprehensive administrative tools.',
        },
    ];

    return (
        <Section className="bg-background">
            <Container>
                <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    How It Works
                </h2>
                <div className="grid gap-8 md:grid-cols-3">
                    {steps.map((step, index) => (
                        <Card key={index} className="flex flex-col items-center text-center p-8">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-primary">
                                <step.icon className="h-8 w-8" />
                            </div>
                            <h3 className="mb-4 text-xl font-semibold text-foreground">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </Card>
                    ))}
                </div>
            </Container>
        </Section>
    );
};
