import { Router } from "express";
import {
    createNewsBlog,
    deleteNewsBlog,
    getAllNewsBlogs,
    getNewsBlogById, getNewsBlogsCategories,
    updateNewsBlog
} from "../controllers/newsBlog.controller";
import { validate } from "../middlewares/validation.middleware";
import {
    createNewsBlogSchema,
    updateNewsBlogSchema,
    getNewsBlogByIdSchema,
    deleteNewsBlogSchema
} from "../validations/newsBlog.validations";
import { writeLimiter } from "../middlewares/rateLimiter.middleware";
import { authMiddleware, requireRole } from "../middlewares/auth";

const router = Router();

router.post("/", authMiddleware, requireRole(["admin"]), writeLimiter, validate(createNewsBlogSchema), createNewsBlog);
router.get("/", getAllNewsBlogs);
router.get("/news-blog-categories", getNewsBlogsCategories);
router.get("/:id", validate(getNewsBlogByIdSchema), getNewsBlogById);
router.patch("/:id", authMiddleware, requireRole(["admin"]), writeLimiter, validate(updateNewsBlogSchema), updateNewsBlog);
router.delete("/:id", authMiddleware, requireRole(["admin"]), writeLimiter, validate(deleteNewsBlogSchema), deleteNewsBlog);

export default router;
