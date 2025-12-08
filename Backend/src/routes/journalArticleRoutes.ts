import { Router } from "express";
import {
    createJournalArticle,
    deleteJournalArticle,
    getAllJournalArticles,
    getJournalArticleById,
    getJournalArticleCategories,
    getJournalArticlesByCategory,
    getJournalArticlesByVolumeIssue,
    getLatestJournalArticles,
    updateJournalArticle,
    downloadJournalArticlePdf,
} from "../controllers/journalArticle.controller";

const router = Router();

// Specific routes must come before parameterized routes
router.post("/", createJournalArticle);
router.get("/", getAllJournalArticles);
router.get("/latest", getLatestJournalArticles);
router.get("/categories", getJournalArticleCategories);
router.get("/volume/:volume/issue/:issue", getJournalArticlesByVolumeIssue);
router.get("/category/:category", getJournalArticlesByCategory);
router.patch("/:id", updateJournalArticle);
router.delete("/:id", deleteJournalArticle);
router.get("/:articleId", getJournalArticleById);

// route for PDF preview/stream
router.get("/stream/pdf", downloadJournalArticlePdf);

export default router;

