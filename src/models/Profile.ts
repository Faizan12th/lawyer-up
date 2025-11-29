import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProfile extends Document {
    user: mongoose.Types.ObjectId;
    bio?: string;
    experience?: number; // Years of experience
    specializations: string[];
    city?: string;
    consultationFee?: number;
    phone?: string;
    website?: string;
    address?: string;
    cnic?: string;
    licenseNumber?: string;
    availability?: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ProfileSchema: Schema<IProfile> = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        bio: {
            type: String,
        },
        experience: {
            type: Number,
        },
        specializations: {
            type: [String],
            default: [],
        },
        city: {
            type: String,
        },
        consultationFee: {
            type: Number,
        },
        phone: {
            type: String,
        },
        website: {
            type: String,
        },
        address: {
            type: String,
        },
        cnic: {
            type: String,
        },
        licenseNumber: {
            type: String,
        },
        availability: {
            type: String,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Profile: Model<IProfile> = mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);

export default Profile;
