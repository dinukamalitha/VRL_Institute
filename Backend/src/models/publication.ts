import mongoose, { Schema, Document } from "mongoose";
import { AuthorSchema, IAuthor, urlValidator } from "./author";

export interface IPublication extends Document {
    title: string;
    documentUrl: string;
    category: string;
    authors: IAuthor[];
    thumbnail?: string;
    authorImage?: string;
    createdAt: Date;
    updatedAt: Date;
}

const PublicationSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        documentUrl: {
            type: String,
            required: true,
            validate: {
                validator: (url: string) => urlValidator(url),
                message: (props: any) => `Invalid document URL: ${props.value}`,
            },
        },
        category: { type: String, required: true },
        authors: {
            type: [AuthorSchema],
            required: true,
            validate: {
                validator: (arr: IAuthor[]) => arr.length > 0,
                message: "At least one author is required.",
            },
        },
        thumbnail: {
            type: String,
            required: false,
            validate: {
                validator: (url: string) => !url || urlValidator(url),
                message: (props: any) => `Invalid thumbnail URL: ${props.value}`,
            },
        },
        authorImage: {
            type: String,
            required: false,
            validate: {
                validator: (url: string) => !url || urlValidator(url),
                message: (props: any) => `Invalid author image URL: ${props.value}`,
            },
        },
    },
    { timestamps: true }
);

export default mongoose.model<IPublication>("Publication", PublicationSchema);
