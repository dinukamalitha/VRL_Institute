import mongoose, { Schema, Document } from "mongoose";
import {AuthorSchema, IAuthor, urlValidator} from "./author";

export interface IEvent extends Document {
    title: string;
    description?: string;
    location?: string;
    medium?: string;
    status: string;
    date?: string;
    time?: string;
    timestamp: Date;
    authors?: IAuthor[];
    thumbnail?: string;
    registrationLink?: string;
}

const EventSchema: Schema<IEvent> = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    location: { type: String, required: false },
    medium: { type: String, required: false },
    status: { type: String, required: true, default: "active" },
    date: { type: String, required: false },
    time: { type: String, required: false },
    timestamp: { type: Date, default: Date.now },
    authors: { type: [AuthorSchema], required: false },
    thumbnail: { type: String, validate: urlValidator },
    registrationLink: {
        type: String,
        validate: { validator: urlValidator, message: (props) => `${props.value} is not a valid URL!` }
    }
});

// keep your pre-save hook if you still want auto-formatting date/time
EventSchema.pre<IEvent>("save", function (next) {
    if (this.date) {
        const jsDate = new Date(this.date);

        const year = jsDate.getFullYear();
        const month = (jsDate.getMonth() + 1).toString().padStart(2, "0");
        const day = jsDate.getDate().toString().padStart(2, "0");
        this.date = `${year}-${month}-${day}`;

        // const hours = jsDate.getHours().toString().padStart(2, "0");
        // const minutes = jsDate.getMinutes().toString().padStart(2, "0");
        // this.time = `${hours}:${minutes}`;
    }
    next();
});

export default mongoose.model<IEvent>("Event", EventSchema);
