import React from 'react';
import { Scale } from 'lucide-react';
import { Container } from '../ui/Container';

export const Footer: React.FC = () => {
    return (
        <footer className="border-t border-border bg-background py-12">
            <Container>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Scale className="h-5 w-5" />
                            <span className="text-lg font-bold">LawyerUP</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Empowering legal intelligence with AI technology.
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Platform</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground">For Lawyers</a></li>
                            <li><a href="#" className="hover:text-foreground">For Clients</a></li>
                            <li><a href="#" className="hover:text-foreground">For Law Firms</a></li>
                            <li><a href="#" className="hover:text-foreground">Pricing</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Resources</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground">Legal Database</a></li>
                            <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                            <li><a href="#" className="hover:text-foreground">Documentation</a></li>
                            <li><a href="#" className="hover:text-foreground">API</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Legal</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
                            <li><a href="#" className="hover:text-foreground">Support</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
                    © 2025 LawyerUP. All rights reserved.
                </div>
            </Container>
        </footer>
    );
};
