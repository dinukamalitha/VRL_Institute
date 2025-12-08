import { Request, Response } from "express";
import JournalVolume from "../models/journalVolume";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";

// Create a new Journal Volume
export const createJournalVolume = async (req: Request, res: Response) => {
    try {
        const { title, thumbnail, documentUrl } = req.body;

        const journalVolume = new JournalVolume({
            title,
            thumbnail,
            publisher: "Veritas Research & Learning Institute",
            publishedDate: new Date(),
            documentUrl
        });

        const savedVolume = await journalVolume.save();

        res.status(201).json({
            success: true,
            message: "Journal volume created successfully",
            data: savedVolume,
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

// Get all Journal Volumes
export const getAllJournalVolumes = async (req: Request, res: Response) => {
    try {
        const volumes = await JournalVolume.find().sort({ publishedDate: -1 });

        res.status(200).json({
            success: true,
            data: volumes,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Get Journal Volume by ID
export const getJournalVolumeById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const volume = await JournalVolume.findById(id);

        if (!volume) {
            return res.status(404).json({
                success: false,
                message: "Journal volume not found",
            });
        }

        res.status(200).json({
            success: true,
            data: volume,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Get current/latest Journal Volume
export const getCurrentJournalVolume = async (_req: Request, res: Response) => {
    try {
        const volume = await JournalVolume.findOne()
            .sort({ publishedDate: -1 });

        // If no volume exists, return data: null instead of 404
        return res.status(200).json({
            success: true,
            data: volume || null,
            message: volume ? "Current journal volume found" : "No journal volume found",
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Update Journal Volume
export const updateJournalVolume = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, thumbnail, publisher, documentUrl } = req.body;

        const updatedVolume = await JournalVolume.findByIdAndUpdate(
            id,
            { title, thumbnail, publisher, documentUrl },
            { new: true, runValidators: true }
        );

        if (!updatedVolume) {
            return res.status(404).json({
                success: false,
                message: "Journal volume not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Journal volume updated successfully",
            data: updatedVolume,
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

// Delete Journal Volume
export const deleteJournalVolume = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedVolume = await JournalVolume.findByIdAndDelete(id);

        if (!deletedVolume) {
            return res.status(404).json({
                success: false,
                message: "Journal volume not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Journal volume deleted successfully",
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Stream journal volume PDF
export const streamJournalVolumePdf = async (req: Request, res: Response) => {
    const fullPath = (req.query.fullPath || req.query.fullpath) as string;
    if (!fullPath) return res.status(400).send("Missing 'fullPath' query param");

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try {
        const signedUrl = cloudinary.utils.private_download_url(fullPath, '', {
            resource_type: 'raw',
            type: 'upload',
            expires_at: Math.floor(Date.now() / 1000) + 300 // 5 min
        });

        const filename = fullPath.split('/').pop() || 'file';
        const ext = filename.split('.').pop()?.toLowerCase() || '';

        // Map extensions to MIME types
        const mimeTypes: Record<string, string> = {
            pdf: 'application/pdf',
            doc: 'application/msword',
            docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            xls: 'application/vnd.ms-excel',
            xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            txt: 'text/plain',
            csv: 'text/csv',
        };

        const contentType = mimeTypes[ext] || 'application/octet-stream';

        const cloudinaryResponse = await axios.get(signedUrl, { responseType: 'stream' });

        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Length', cloudinaryResponse.headers['content-length'] || '');

        cloudinaryResponse.data.pipe(res);

    } catch (err) {
        console.error("Error streaming journal volume file:", err);
        res.status(500).send("Failed to load file");
    }
};

