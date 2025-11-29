import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { User, Star, Briefcase, MapPin, DollarSign } from 'lucide-react';

interface LawyerCardProps {
    profile: any;
}

export const LawyerCard: React.FC<LawyerCardProps> = ({ profile }) => {
    return (
        <Card className="p-6 flex flex-col h-full">
            <div className="flex items-start gap-4 mb-4">
                <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {profile.user?.image ? (
                        <img src={profile.user.image} alt={profile.user.name} className="h-full w-full object-cover" />
                    ) : (
                        <User className="h-7 w-7 text-gray-600" />
                    )}
                </div>
                <div>
                    <h3 className="font-semibold text-lg">{profile.user?.name || 'Unknown Lawyer'}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {profile.specializations?.map((spec: string, idx: number) => (
                            <span key={idx} className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                {spec}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-sm text-yellow-600">4.8</span>
                <span className="text-sm text-muted-foreground">(12 reviews)</span>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground mb-6 flex-1">
                <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>{profile.experience} years experience</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{profile.city}</span>
                </div>
                <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>PKR {profile.consultationFee}/consultation</span>
                </div>
            </div>

            <Link href={`/client/lawyers/${profile.user?._id}`} className="mt-auto">
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                    View Profile
                </Button>
            </Link>
        </Card>
    );
};
