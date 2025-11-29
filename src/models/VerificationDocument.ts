import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVerificationDocument extends Document {
    user: mongoose.Types.ObjectId;
    type: string; // e.g., 'bar_license', 'id_proof'
    url: string; // Cloudinary URL
    publicId: string; // Cloudinary Public ID
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
}

const VerificationDocumentSchema: Schema<IVerificationDocument> = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        publicId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

const VerificationDocument: Model<IVerificationDocument> = mongoose.models.VerificationDocument || mongoose.model<IVerificationDocument>('VerificationDocument', VerificationDocumentSchema);

export default VerificationDocument;
