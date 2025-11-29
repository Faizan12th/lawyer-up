import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IChat extends Document {
    participants: mongoose.Types.ObjectId[];
    lastMessage?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ChatSchema: Schema<IChat> = new Schema(
    {
        participants: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
        lastMessage: {
            type: Schema.Types.ObjectId,
            ref: 'Message',
        },
    },
    { timestamps: true }
);

export interface IMessage extends Document {
    chat: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    content: string;
    readBy: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const MessageSchema: Schema<IMessage> = new Schema(
    {
        chat: {
            type: Schema.Types.ObjectId,
            ref: 'Chat',
            required: true,
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        readBy: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
    },
    { timestamps: true }
);

export const Chat: Model<IChat> = mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema);
export const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
