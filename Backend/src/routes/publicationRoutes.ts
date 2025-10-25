import { Router } from "express";
import {
    createPublication,
    deletePublication,
    getAllPublications,
    updatePublication
} from "../controllers/publication.controller";

const router = Router();

router.post("/", createPublication);
router.get("/", getAllPublications);
router.get("/:id", getAllPublications);
router.patch("/:id", updatePublication);
router.delete("/:id", deletePublication);

export default router;
