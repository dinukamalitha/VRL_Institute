import mongoose, { Schema, Document } from "mongoose";
import {AuthorSchema, IAuthor, urlValidator} from "./author";

export interface INewsBlog extends Document {
    title: string;
    description: string;
    category: string;
    status: string;
    date: string;
    time: string;
    timestamp: Date;
    authors: IAuthor[];
    images: string[];
}

const NewsBlogSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: false },
    status: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String },
    timestamp: { type: Date, default: Date.now },
    authors: {
        type: [AuthorSchema],
        required: false,
        validate: {
            validator: function (arr: IAuthor[]) {
                return arr.length > 0;
            },
            message: "At least one author is required."
        }
    },
    images: {
        type: [String],
        required: false,
        validate: {
            validator: function (arr: string[]) {
                return arr.every((url) => urlValidator(url))
            },
            message: (props: any) => `Invalid image URL(s): ${props.value}`
        }
    }
});

// Pre-save hook to auto-split date & time
NewsBlogSchema.pre<INewsBlog>("save", function (next) {
    if (this.date) {
        const jsDate = new Date(this.date);

        const year = jsDate.getFullYear();
        const month = (jsDate.getMonth() + 1).toString().padStart(2, "0");
        const day = jsDate.getDate().toString().padStart(2, "0");
        this.date = `${year}-${month}-${day}`;

        const hours = jsDate.getHours().toString().padStart(2, "0");
        const minutes = jsDate.getMinutes().toString().padStart(2, "0");
        this.time = `${hours}:${minutes}`;
    }
    next();
});

export default mongoose.model<INewsBlog>("NewsBlog", NewsBlogSchema);
