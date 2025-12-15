import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import {connectDB} from "./config/database";
import userRoutes from "./routes/userRoutes";
import newsBlogRoutes from "./routes/newsBlogRoutes";
import eventsRoutes from "./routes/eventsRoutes";
import resourcePersonsRoutes from "./routes/resourcePersonsRoutes";
import homeContentRoutes from "./routes/homeContentRoutes";
import staffRoutes from "./routes/staffRoutes";
import publicationRoutes from "./routes/publicationRoutes";
import journalArticleRoutes from "./routes/journalArticleRoutes";
import journalVolumeRoutes from "./routes/journalVolumeRoutes";
import journalContentRoutes from "./routes/journalContentRoutes";
import { apiLimiter } from "./middlewares/rateLimiter.middleware";

const app = express();

// Middleware
const corsOptions = {
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
      const allowedOrigins = [
        process.env.PRODUCTION_FRONTEND_URL,
        process.env.NEXT_PUBLIC_FRONTEND_URL
      ].filter(Boolean);
      
      // Allow requests with no origin (mobile apps, Postman, etc.) in development
      if (process.env.NODE_ENV === 'development' && !origin) {
        return callback(null, true);
      }
      
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

// Apply general rate limiting to all API routes
app.use("/api", apiLimiter);

// Connect Database
connectDB();

// Routes
app.use("/api", routes);
app.use("/api/users", userRoutes);
app.use("/api/news-blogs", newsBlogRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/resource-persons", resourcePersonsRoutes);
app.use("/api/home-content", homeContentRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/publications", publicationRoutes);
app.use("/api/journal-articles", journalArticleRoutes);
app.use("/api/journal-volumes", journalVolumeRoutes);
app.use("/api/journal-content", journalContentRoutes);

// Error Handler
app.use(errorHandler);

export default app;