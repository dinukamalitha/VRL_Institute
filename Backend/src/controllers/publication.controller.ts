import { Request, Response } from "express";
import Publication from "../models/publication";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";

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

// Get publication counts grouped by category
export const getPublicationCountsByCategory = async (_req: Request, res: Response) => {
    try {
        // MongoDB aggregation pipeline to group by category and count
        const categoryCounts = await Publication.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    count: 1,
                },
            },
        ]);

        // resultArray = [{ category: 'Books', count: 5 }, { category: 'Thesis', count: 10 }]
        // To make it easier to consume, let's transform it into a key-value object:
        // { "Books": 5, "Thesis": 10 }
        const formattedCounts = categoryCounts.reduce((acc, item) => {
            acc[item.category] = item.count;
            return acc;
        }, {} as Record<string, number>);


        res.status(200).json({
            success: true,
            data: formattedCounts,
        });

    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get a Publication by Category
export const getPublicationsByCategory = async (req: Request, res: Response) => {
    try {
        const { category } = req.params;
        const publications = await Publication.find({
            category: category
        }).sort({ createdAt: -1 });

        if (publications.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No publications found in category '${category}'`,
            });
        }

        res.status(200).json({
            success: true,
            data: publications,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// generates a signed URL
export const generateSignedPdfUrl = async (req: Request, res: Response) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const fullPath = req.query.fullPath || req.query.fullpath;
    const fullPathString = Array.isArray(fullPath) ? fullPath[0] : fullPath as string;

    if (!fullPathString) {
        return res.status(400).json({ error: "Missing 'fullPath' query parameter" });
    }

    try {
        if (typeof fullPathString === "string") {
            const signedUrl = cloudinary.utils.private_download_url(fullPathString, '', {
                resource_type: 'raw',
                type: 'upload',
                expires_at: Math.floor(Date.now() / 1000) + 600
            });

            res.status(200).json({ url: signedUrl });
        }



    } catch (err) {
        console.error("Error generating signed PDF URL:", err);
        res.status(500).json({ error: "Cannot generate a URL for the PDF" });
    }
};

