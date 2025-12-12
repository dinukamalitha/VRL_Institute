import express from "express";
import {getHomeContent, updateHomeContent} from "../controllers/homeContent.controller";
import { validate } from "../middlewares/validation.middleware";
import { updateHomeContentSchema } from "../validations/homeContent.validations";
import { writeLimiter } from "../middlewares/rateLimiter.middleware";
import { authMiddleware, requireRole } from "../middlewares/auth";

const router = express.Router();

router.get("/", getHomeContent);
router.patch("/", authMiddleware, requireRole(["admin"]), writeLimiter, validate(updateHomeContentSchema), updateHomeContent);

export default router;
