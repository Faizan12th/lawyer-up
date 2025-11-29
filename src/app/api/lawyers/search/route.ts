import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Profile from '@/models/Profile';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);

        const category = searchParams.get('category');
        const city = searchParams.get('city');
        const minExperience = searchParams.get('minExperience');
        const maxFee = searchParams.get('maxFee');
        const name = searchParams.get('name');

        // Build Profile Query
        const profileQuery: any = {};
        if (category) {
            profileQuery.specializations = { $in: [new RegExp(category, 'i')] };
        }
        if (city) {
            profileQuery.city = new RegExp(city, 'i');
        }
        if (minExperience) {
            profileQuery.experience = { $gte: parseInt(minExperience) };
        }
        if (maxFee) {
            profileQuery.consultationFee = { $lte: parseInt(maxFee) };
        }

        // Find profiles matching criteria
        const profiles = await Profile.find(profileQuery).populate({
            path: 'user',
            select: 'name email image role status',
            match: {
                role: { $in: ['lawyer', 'law_firm'] },
                status: 'active'
            }
        });

        // Filter out profiles where user didn't match (e.g. inactive or not lawyer)
        const validProfiles = profiles.filter(p => p.user);

        // If name search is provided, further filter
        let finalResults = validProfiles;
        if (name) {
            const nameRegex = new RegExp(name, 'i');
            finalResults = validProfiles.filter((p: any) => nameRegex.test(p.user.name));
        }

        return NextResponse.json({
            message: 'Lawyers fetched successfully',
            data: finalResults,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
