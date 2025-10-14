import mongoose, { Schema } from "mongoose";

export interface IAuthor {
    name?: string;
    photo?: string;
    description?: string;
}

export const urlValidator = (v: string) => {
    if (!v) return true;
    return /^https?:\/\/.+\..+/.test(v);
};

export const AuthorSchema: Schema = new Schema(
    {
        name: { type: String, required: false },
        photo: {
            type: String,
            required: false,
            validate: {
                validator: urlValidator,
                message: (props: any) => `Invalid author photo URL: ${props.value}`,
            },
        },
        description: { type: String, required: false },
    },
    { timestamps: true }
);

export default mongoose.model<IAuthor>("Author", AuthorSchema);
