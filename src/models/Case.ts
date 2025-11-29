import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICaseEvent {
    title: string;
    date: Date;
    description?: string;
}

export interface ICase extends Document {
    title: string;
    description: string;
    client: mongoose.Types.ObjectId;
    lawyer: mongoose.Types.ObjectId;
    status: 'active' | 'closed' | 'pending';
    priority: 'Low' | 'Medium' | 'High';
    deadline?: Date;
    events: ICaseEvent[];
    createdAt: Date;
    updatedAt: Date;
}

const CaseSchema: Schema<ICase> = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        client: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        lawyer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'closed', 'pending'],
            default: 'active',
        },
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            default: 'Medium',
        },
        deadline: {
            type: Date,
        },
        events: [{
            title: { type: String, required: true },
            date: { type: Date, required: true },
            description: { type: String },
        }],
    },
    { timestamps: true }
);

const Case: Model<ICase> = mongoose.models.Case || mongoose.model<ICase>('Case', CaseSchema);

export default Case;
