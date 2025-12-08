import mongoose, { Schema, Document } from "mongoose";
import { urlValidator } from "./author";

export interface IJournalVolume extends Document {
    title: string;
    thumbnail?: string;
    publisher: string;
    publishedDate: Date;
    documentUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

const JournalVolumeSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        thumbnail: {
            type: String,
            required: false,
            validate: {
                validator: (url: string) => !url || urlValidator(url),
                message: (props: any) => `Invalid thumbnail URL: ${props.value}`,
            },
        },
        publisher: { type: String, required: true },
        publishedDate: { type: Date, required: true },
        documentUrl: { type: String, required: false },
    },
    { timestamps: true }
);

export default mongoose.model<IJournalVolume>("JournalVolume", JournalVolumeSchema);
