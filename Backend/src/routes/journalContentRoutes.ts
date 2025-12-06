import { Router } from "express";
import {
    getJournalContent,
    updateJournalContent,
} from "../controllers/journalContent.controller";

const router = Router();

router.get("/", getJournalContent);
router.patch("/", updateJournalContent);

export default router;

