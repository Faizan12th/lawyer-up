import React from 'react';
import { Container } from '../ui/Container';
import { Section } from '../ui/Section';

export const AboutSection: React.FC = () => {
    return (
        <Section className="bg-background">
            <Container>
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        About LawyerUP
                    </h2>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        LawyerUP is a revolutionary legal-tech platform that bridges the gap between legal professionals and clients while harnessing the power of AI to streamline case management, legal drafting, and consultation services.
                    </p>
                </div>
            </Container>
        </Section>
    );
};
