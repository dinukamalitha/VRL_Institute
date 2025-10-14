import { Router } from "express";
import {
    createNewsBlog,
    deleteNewsBlog,
    getAllNewsBlogs,
    getNewsBlogById, getNewsBlogsCategories,
    updateNewsBlog
} from "../controllers/newsBlog.controller";

const router = Router();

router.post("/", createNewsBlog);
router.get("/", getAllNewsBlogs);
router.get("/news-blog-categories", getNewsBlogsCategories);
router.get("/:id", getNewsBlogById);
router.patch("/:id", updateNewsBlog);
router.delete("/:id", deleteNewsBlog);

export default router;
