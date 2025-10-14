import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import {connectDB} from "./config/database";
import userRoutes from "./routes/userRoutes";
import newsBlogRoutes from "./routes/newsBlogRoutes";
import eventsRoutes from "./routes/eventsRoutes";
import resourcePersonsRoutes from "./routes/resourcePersonsRoutes";
import homeContentRoutes from "./routes/homeContentRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use("/api", routes);
app.use("/api/users", userRoutes);
app.use("/api/news-blogs", newsBlogRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/resource-persons", resourcePersonsRoutes);
app.use("/api/home-content", homeContentRoutes);

// Error Handler
app.use(errorHandler);

export default app;
