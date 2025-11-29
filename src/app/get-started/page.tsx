import React from 'react';
import { Scale, Users, Building2 } from 'lucide-react';
import { RoleSelection } from '@/components/auth/RoleSelection';

export default function GetStartedPage() {
    const roles = [
        {
            icon: Scale,
            title: 'Lawyer',
            description: 'Manage cases, consult with clients, and leverage AI for legal drafting',
            action: 'Continue as Lawyer',
            href: '/register/lawyer',
        },
        {
            icon: Users,
            title: 'Client',
            description: 'Find lawyers, book consultations, and track your legal matters',
            action: 'Continue as Client',
            href: '/register/client',
        },
        {
            icon: Building2,
            title: 'Law Firm',
            description: 'Manage team lawyers, assign cases, and centralize billing',
            action: 'Continue as Law Firm',
            href: '/register/firm',
        },
    ];

    return (
        <RoleSelection
            title="Choose Your Role"
            subtitle="Select how you want to use LawyerUP"
            roles={roles}
            columns={3}
        />
    );
}
