import { Router } from "express";
import {
    getJournalContent,
    updateJournalContent,
} from "../controllers/journalContent.controller";
import { validate } from "../middlewares/validation.middleware";
import { updateJournalContentSchema } from "../validations/journalContent.validations";
import { writeLimiter } from "../middlewares/rateLimiter.middleware";
import { authMiddleware, requireRole } from "../middlewares/auth";

const router = Router();

router.get("/", getJournalContent);
router.patch("/", authMiddleware, requireRole(["admin"]), writeLimiter, validate(updateJournalContentSchema), updateJournalContent);

export default router;

