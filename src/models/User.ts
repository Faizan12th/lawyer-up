import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: 'client' | 'lawyer' | 'law_firm' | 'admin';
    status: 'pending' | 'active' | 'suspended' | 'rejected';
    image?: string;
    lawFirm?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email',
            ],
        },
        password: {
            type: String,
            select: false, // Don't return password by default
        },
        role: {
            type: String,
            enum: ['client', 'lawyer', 'law_firm', 'admin'],
            default: 'client',
        },
        status: {
            type: String,
            enum: ['pending', 'active', 'suspended', 'rejected'],
            default: 'active', // Clients are active by default, Lawyers/Firms might be pending
        },
        image: {
            type: String,
        },
        lawFirm: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

// Prevent recompilation of model in development
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
