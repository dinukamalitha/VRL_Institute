import { Request, Response } from "express";
import JournalVolume from "../models/journalVolume";

// Create a new Journal Volume
export const createJournalVolume = async (req: Request, res: Response) => {
    try {
        const { title, thumbnail, publisher, publishedDate, documentUrl } = req.body;

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

        if (!volume) {
            return res.status(404).json({
                success: false,
                message: "No journal volume found",
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

