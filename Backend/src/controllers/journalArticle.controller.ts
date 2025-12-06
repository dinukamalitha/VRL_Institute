import { Request, Response } from "express";
import JournalArticle from "../models/journalArticle";

// Create a new Journal Article
export const createJournalArticle = async (req: Request, res: Response) => {
    try {
        const { title, abstract, category, authors, thumbnail, publishedDate, volume, issue, keywords, documentUrl, peerReviewed } = req.body;

        const journalArticle = new JournalArticle({
            title,
            abstract,
            category,
            authors,
            thumbnail,
            publishedDate: new Date(),
            volume,
            issue,
            keywords: keywords || [],
            documentUrl: documentUrl || null,
            peerReviewed: peerReviewed !== undefined ? peerReviewed : true,
        });

        const savedArticle = await journalArticle.save();

        res.status(201).json({
            success: true,
            message: "Journal article created successfully",
            data: savedArticle,
        });
    } catch (error: any) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// Get all Journal Articles
export const getAllJournalArticles = async (req: Request, res: Response) => {
    try {
        const articles = await JournalArticle.find().sort({ publishedDate: -1 });

        res.status(200).json({
            success: true,
            data: articles,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Get Journal Article by ID
export const getJournalArticleById = async (req: Request, res: Response) => {
    try {
        const { articleId } = req.params;
        const article = await JournalArticle.findById(articleId);

        if (!article) {
            return res.status(404).json({
                success: false,
                message: "Journal article not found",
            });
        }

        res.status(200).json({
            success: true,
            data: article,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Get Journal Articles by Volume and Issue
export const getJournalArticlesByVolumeIssue = async (req: Request, res: Response) => {
    try {
        const { volume, issue } = req.params;
        const articles = await JournalArticle.find({
            volume,
            issue,
        }).sort({ publishedDate: -1 });

        res.status(200).json({
            success: true,
            data: articles,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Get Journal Articles by Category
export const getJournalArticlesByCategory = async (req: Request, res: Response) => {
    try {
        const { category } = req.params;
        const articles = await JournalArticle.find({
            category: category,
        }).sort({ publishedDate: -1 });

        res.status(200).json({
            success: true,
            data: articles,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Get Journal Article categories
export const getJournalArticleCategories = async (_req: Request, res: Response) => {
    try {
        const categories = await JournalArticle.distinct("category");
        res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Get latest Journal Articles
export const getLatestJournalArticles = async (req: Request, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 5;
        const articles = await JournalArticle.find()
            .sort({ publishedDate: -1 })
            .limit(limit);

        res.status(200).json({
            success: true,
            data: articles,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Update Journal Article
export const updateJournalArticle = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, abstract, category, authors, thumbnail, publishedDate, volume, issue, keywords, documentUrl, peerReviewed } = req.body;

        const updatedArticle = await JournalArticle.findByIdAndUpdate(
            id,
            { title, abstract, category, authors, thumbnail, volume, issue, keywords, documentUrl, peerReviewed },
            { new: true, runValidators: true }
        );

        if (!updatedArticle) {
            return res.status(404).json({
                success: false,
                message: "Journal article not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Journal article updated successfully",
            data: updatedArticle,
        });
    } catch (err: any) {
        if (err.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Delete Journal Article
export const deleteJournalArticle = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedArticle = await JournalArticle.findByIdAndDelete(id);

        if (!deletedArticle) {
            return res.status(404).json({
                success: false,
                message: "Journal article not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Journal article deleted successfully",
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

