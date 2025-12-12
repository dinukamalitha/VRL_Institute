import { Router } from "express";
import {
    createPublication,
    deletePublication,
    getAllPublications,
    getPublicationById,
    getPublicationCountsByCategory,
    getPublicationsByCategory, generateSignedPdfUrl,
    updatePublication
} from "../controllers/publication.controller";
import { validate } from "../middlewares/validation.middleware";
import {
    createPublicationSchema,
    updatePublicationSchema,
    getPublicationByIdSchema,
    getPublicationsByCategorySchema,
    deletePublicationSchema,
    generateSignedPdfUrlSchema
} from "../validations/publication.validations";
import { writeLimiter } from "../middlewares/rateLimiter.middleware";
import { authMiddleware, requireRole } from "../middlewares/auth";

const router = Router();

router.post("/", authMiddleware, requireRole(["admin"]), writeLimiter, validate(createPublicationSchema), createPublication);
router.get("/", getAllPublications);
router.get("/countsByCategory", getPublicationCountsByCategory);
router.get("/stream/pdf", validate(generateSignedPdfUrlSchema), generateSignedPdfUrl);
router.get("/:category", validate(getPublicationsByCategorySchema), getPublicationsByCategory);
router.get("/:id", validate(getPublicationByIdSchema), getPublicationById);
router.patch("/:id", authMiddleware, requireRole(["admin"]), writeLimiter, validate(updatePublicationSchema), updatePublication);
router.delete("/:id", authMiddleware, requireRole(["admin"]), writeLimiter, validate(deletePublicationSchema), deletePublication);

export default router;
