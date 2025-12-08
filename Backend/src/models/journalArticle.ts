import mongoose, { Schema, Document } from "mongoose";
import { AuthorSchema, IAuthor, urlValidator } from "./author";

export interface IJournalArticle extends Document {
    title: string;
    abstract: string;
    category: string;
    authors: IAuthor[];
    publishedDate: Date;
    volume: string;
    issue: string;
    keywords?: string[];
    documentUrl: string;
    peerReviewed?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const JournalArticleSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        abstract: { type: String, required: true },
        category: { type: String, required: true },
        authors: {
            type: [AuthorSchema],
            required: true,
            validate: {
                validator: (arr: IAuthor[]) => arr.length > 0,
                message: "At least one author is required.",
            },
        },
        publishedDate: { type: Date, required: true },
        volume: { type: String, required: true },
        issue: { type: String, required: true },
        keywords: { type: [String], default: [] },
        documentUrl: { type: String, required: false },
        peerReviewed: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model<IJournalArticle>("JournalArticle", JournalArticleSchema);
