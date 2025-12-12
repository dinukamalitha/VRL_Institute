import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const ENV = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || "development",
    MONGO_URI: process.env.MONGO_URI as string,
    JWT_SECRET: process.env.JWT_SECRET as string
};

// Validate required environment variables
if (!ENV.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is required");
  }
  if (!ENV.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is required");
  }
