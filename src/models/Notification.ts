import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INotification extends Document {
    recipient: mongoose.Types.ObjectId;
    sender?: mongoose.Types.ObjectId; // Optional, system notifications might not have a sender
    type: 'appointment_request' | 'appointment_accepted' | 'appointment_rejected' | 'case_assigned' | 'registration_approved' | 'general';
    message: string;
    read: boolean;
    relatedId?: mongoose.Types.ObjectId; // ID of the appointment, case, etc.
    createdAt: Date;
    updatedAt: Date;
}

const NotificationSchema: Schema<INotification> = new Schema(
    {
        recipient: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        type: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        read: {
            type: Boolean,
            default: false,
        },
        relatedId: {
            type: Schema.Types.ObjectId,
        },
    },
    { timestamps: true }
);

const Notification: Model<INotification> = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;
