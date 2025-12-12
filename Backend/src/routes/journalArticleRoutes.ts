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
import { validate } from "../middlewares/validation.middleware";
import {
    createJournalArticleSchema,
    updateJournalArticleSchema,
    getJournalArticleByIdSchema,
    getJournalArticlesByVolumeIssueSchema,
    getJournalArticlesByCategorySchema,
    getLatestJournalArticlesSchema,
    deleteJournalArticleSchema,
    downloadJournalArticlePdfSchema
} from "../validations/journalArticle.validations";
import { writeLimiter } from "../middlewares/rateLimiter.middleware";
import { authMiddleware, requireRole } from "../middlewares/auth";

const router = Router();

// Specific routes must come before parameterized routes
router.post("/", authMiddleware, requireRole(["admin"]), writeLimiter, validate(createJournalArticleSchema), createJournalArticle);
router.get("/", getAllJournalArticles);
router.get("/latest", validate(getLatestJournalArticlesSchema), getLatestJournalArticles);
router.get("/categories", getJournalArticleCategories);
router.get("/volume/:volume/issue/:issue", validate(getJournalArticlesByVolumeIssueSchema), getJournalArticlesByVolumeIssue);
router.get("/category/:category", validate(getJournalArticlesByCategorySchema), getJournalArticlesByCategory);
router.patch("/:id", authMiddleware, requireRole(["admin"]), writeLimiter, validate(updateJournalArticleSchema), updateJournalArticle);
router.delete("/:id", authMiddleware, requireRole(["admin"]), writeLimiter, validate(deleteJournalArticleSchema), deleteJournalArticle);
router.get("/:articleId", validate(getJournalArticleByIdSchema), getJournalArticleById);

// route for PDF preview/stream
router.get("/stream/pdf", validate(downloadJournalArticlePdfSchema), downloadJournalArticlePdf);

export default router;

