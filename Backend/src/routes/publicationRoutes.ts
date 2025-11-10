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

const router = Router();

router.post("/", createPublication);
router.get("/", getAllPublications);
router.get("/countsByCategory", getPublicationCountsByCategory);
router.get("/:category", getPublicationsByCategory);
router.get("/:id", getPublicationById);
router.patch("/:id", updatePublication);
router.delete("/:id", deletePublication);

// route for PDF preview/stream
router.get("/stream/pdf", generateSignedPdfUrl);

export default router;
