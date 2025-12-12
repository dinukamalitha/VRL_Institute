import { Router } from "express";
import {
    createJournalVolume,
    deleteJournalVolume,
    getAllJournalVolumes,
    getCurrentJournalVolume,
    getJournalVolumeById,
    updateJournalVolume,
    streamJournalVolumePdf,
} from "../controllers/journalVolume.controller";
import { validate } from "../middlewares/validation.middleware";
import {
    createJournalVolumeSchema,
    updateJournalVolumeSchema,
    getJournalVolumeByIdSchema,
    deleteJournalVolumeSchema,
    streamJournalVolumePdfSchema
} from "../validations/journalVolume.validations";
import { writeLimiter } from "../middlewares/rateLimiter.middleware";
import { authMiddleware, requireRole } from "../middlewares/auth";

const router = Router();

// Specific routes must come before parameterized routes
router.post("/", authMiddleware, requireRole(["admin"]), writeLimiter, validate(createJournalVolumeSchema), createJournalVolume);
router.get("/current", getCurrentJournalVolume);
router.get("/stream/pdf", validate(streamJournalVolumePdfSchema), streamJournalVolumePdf);
router.get("/", getAllJournalVolumes);
router.patch("/:id", authMiddleware, requireRole(["admin"]), writeLimiter, validate(updateJournalVolumeSchema), updateJournalVolume);
router.delete("/:id", authMiddleware, requireRole(["admin"]), writeLimiter, validate(deleteJournalVolumeSchema), deleteJournalVolume);
router.get("/:id", validate(getJournalVolumeByIdSchema), getJournalVolumeById);

export default router;

