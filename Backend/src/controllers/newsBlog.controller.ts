import { Request, Response } from "express";
import NewsBlog from "../models/NewsBlog";

// Create a new blog
export const createNewsBlog = async (req: Request, res: Response) => {
    try {
        const { title, description, category, status, date, authors, images } = req.body;

        if (!authors || !Array.isArray(authors) || authors.length === 0) {
            return res.status(400).json({ error: "At least one author is required." });
        }

        // validate each author has at least name
        for (const author of authors) {
            if (!author.name) {
                return res.status(400).json({ error: "Each author must have a name." });
            }
        }

        const newsBlog = new NewsBlog({
            title,
            description,
            category,
            status,
            date,
            authors: authors.map((a: any) => ({
                name: a.name,
                photo: a.photo || null,
                description: a.description || ""
            })),
            images: images || []
        });

        const savedNewsBlog = await newsBlog.save();
        res.status(201).json(savedNewsBlog);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

// Get all news blogs
export const getAllNewsBlogs = async (_req: Request, res: Response) => {
    try {
        const newsBlogs = await NewsBlog.find({ status: "Published" }).sort({ timestamp: -1 });
        res.json(newsBlogs);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

// Get news blog by ID
export const getNewsBlogById = async (req: Request, res: Response) => {
    try {
        const newsBlog = await NewsBlog.findById(req.params.id);
        if (!newsBlog) return res.status(404).json({ error: "News-Blog not found" });
        res.json(newsBlog);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

// Get news blog categories
export const getNewsBlogsCategories = async (_req: Request, res: Response) => {
    try {
        const categories = await NewsBlog.distinct("category");
        res.json(categories);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};


// Update news blog (PATCH)
export const updateNewsBlog = async (req: Request, res: Response) => {
    try {
        const updatedBlog = await NewsBlog.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedBlog)
            return res.status(404).json({ error: "News-Blog not found" });

        res.json(updatedBlog);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

// Soft delete news blog (mark as deleted)
export const deleteNewsBlog = async (req: Request, res: Response) => {
    try {
        const deletedBlog = await NewsBlog.findByIdAndUpdate(
            req.params.id,
            { $set: { status: "deleted" } },
            { new: true }
        );

        if (!deletedBlog)
            return res.status(404).json({ error: "News-Blog not found" });

        res.json({ message: "News-Blog marked as deleted", blog: deletedBlog });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
