import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
    lawyer: mongoose.Types.ObjectId;
    client: mongoose.Types.ObjectId;
    appointment: mongoose.Types.ObjectId;
    rating: number; // 1-5
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ReviewSchema: Schema<IReview> = new Schema(
    {
        lawyer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        client: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        appointment: {
            type: Schema.Types.ObjectId,
            ref: 'Appointment',
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String,
        },
    },
    { timestamps: true }
);

const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
