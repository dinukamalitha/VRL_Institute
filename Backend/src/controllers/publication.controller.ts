import { Request, Response } from "express";
import Publication from "../models/publication";

// Create a new Publication
export const createPublication = async (req: Request, res: Response) => {
    try {
        const { title, documentUrl, category, authors, thumbnail, authorImage } = req.body;

        const newPublication = new Publication({
            title,
            documentUrl,
            category,
            authors,
            thumbnail,
            authorImage,
        });

        const savedPublication = await newPublication.save();

        res.status(201).json({
            success: true,
            message: "Publication created successfully",
            data: savedPublication,
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

// Get all Publications
export const getAllPublications = async (_req: Request, res: Response) => {
    try {
        const publications = await Publication.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: publications,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get a Publication by ID
export const getPublicationById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: "Publication not found",
            });
        }

        res.status(200).json({
            success: true,
            data: publication,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update a Publication by ID
export const updatePublication = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, documentUrl, category, authors, thumbnail, authorImage } = req.body;

        const updatedPublication = await Publication.findByIdAndUpdate(
            id,
            { title, documentUrl, category, authors, thumbnail, authorImage },
            { new: true, runValidators: true }
        );

        if (!updatedPublication) {
            return res.status(404).json({
                success: false,
                message: "Publication not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Publication updated successfully",
            data: updatedPublication,
        });
    } catch (err: any) {
        if (err.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
        res.status(500).json({ success: false, message: err.message });
    }
};

// Delete a Publication by ID
export const deletePublication = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedPublication = await Publication.findByIdAndDelete(id);

        if (!deletedPublication) {
            return res.status(404).json({
                success: false,
                message: "Publication not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Publication deleted successfully",
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};
