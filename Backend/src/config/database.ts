import mongoose from "mongoose";
import {ENV} from "./env";

export const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${(error as Error).message}`);
        process.exit(1);
    }
};
