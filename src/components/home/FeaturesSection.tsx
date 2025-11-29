import React from 'react';
import { Gavel, Calendar, FileText, MessageSquare, Shield, UserCheck, Brain, FolderOpen } from 'lucide-react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';

export const FeaturesSection: React.FC = () => {
    const features = [
        {
            icon: Gavel,
            title: 'AI Legal Drafting',
            description: 'Generate legal documents, statements, and arguments with AI assistance based on Pakistan\'s legal framework.',
        },
        {
            icon: Calendar,
            title: 'Appointment Booking',
            description: 'Schedule consultations with verified lawyers, manage your calendar, and receive automated reminders.',
        },
        {
            icon: FileText,
            title: 'Case Management',
            description: 'Track cases, manage documents, monitor hearing schedules, and maintain comprehensive case histories.',
        },
        {
            icon: MessageSquare,
            title: 'Secure Communication',
            description: 'Real-time chat with lawyers, share documents securely, and maintain confidential communications.',
        },
        {
            icon: Shield,
            title: 'Legal Intelligence',
            description: 'Access Pakistan Penal Code, CPC, and comprehensive legal databases with intelligent search capabilities.',
        },
        {
            icon: UserCheck,
            title: 'Lawyer Directory',
            description: 'Browse verified lawyers by practice area, experience, ratings, and location with detailed profiles.',
        },
        {
            icon: Brain,
            title: 'AI Predictions',
            description: 'Get hypothetical case outcomes, counterarguments, and strategic insights powered by AI analysis.',
        },
        {
            icon: FolderOpen,
            title: 'Document Management',
            description: 'Organize, store, and retrieve case documents. FIRs, evidence, and AI-generated drafts securely.',
        },
    ];

    return (
        <Section className="bg-background">
            <Container>
                <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Platform Features
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <Card key={index} className="h-full p-6 transition-shadow hover:shadow-md">
                            <div className="mb-4 text-primary">
                                <feature.icon className="h-8 w-8" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </Container>
        </Section>
    );
};
