import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAppointment extends Document {
    client: mongoose.Types.ObjectId;
    lawyer: mongoose.Types.ObjectId;
    date: Date;
    startTime: string; // e.g., "10:00"
    endTime: string; // e.g., "11:00"
    status: 'requested' | 'upcoming' | 'completed' | 'cancelled' | 'rejected';
    type: 'consultation' | 'hearing' | 'other';
    notes?: string;
    fee?: number;
    createdAt: Date;
    updatedAt: Date;
}

const AppointmentSchema: Schema<IAppointment> = new Schema(
    {
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
        date: {
            type: Date,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['requested', 'upcoming', 'completed', 'cancelled', 'rejected'],
            default: 'requested',
        },
        type: {
            type: String,
            enum: ['consultation', 'hearing', 'other'],
            default: 'consultation',
        },
        notes: {
            type: String,
        },
        fee: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Appointment: Model<IAppointment> = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);

export default Appointment;
