import { Router } from "express";
import {
    createJournalVolume,
    deleteJournalVolume,
    getAllJournalVolumes,
    getCurrentJournalVolume,
    getJournalVolumeById,
    updateJournalVolume,
} from "../controllers/journalVolume.controller";

const router = Router();

// Specific routes must come before parameterized routes
router.post("/", createJournalVolume);
router.get("/current", getCurrentJournalVolume);
router.get("/", getAllJournalVolumes);
router.patch("/:id", updateJournalVolume);
router.delete("/:id", deleteJournalVolume);
router.get("/:id", getJournalVolumeById);

export default router;

