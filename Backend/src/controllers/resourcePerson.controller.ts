import { Request, Response } from "express";
import Author from "../models/author";

// Create a new resource person
export const createResourcePerson = async (req: Request, res: Response) => {
    try {
        const { name, photo, description } = req.body;

        const newPerson = new Author({ name, photo, description });
        const savedPerson = await newPerson.save();

        res.status(201).json({
            success: true,
            message: "Resource person created successfully",
            data: savedPerson,
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

// Get all resource persons
export const getAllResourcePersons = async (_req: Request, res: Response) => {
    try {
        const resourcePersons = await Author.find().sort({ createdAt: 1 });
        res.status(200).json(resourcePersons);
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get a resource person by ID
export const getResourcePersonById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const person = await Author.findById(id);

        if (!person) {
            return res.status(404).json({
                success: false,
                message: "Resource person not found",
            });
        }

        res.status(200).json({
            success: true,
            data: person,
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update a resource person by ID
export const updateResourcePerson = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, photo, description } = req.body;

        const updatedPerson = await Author.findByIdAndUpdate(
            id,
            { name, photo, description },
            { new: true, runValidators: true }
        );

        if (!updatedPerson) {
            return res.status(404).json({
                success: false,
                message: "Resource person not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Resource person updated successfully",
            data: updatedPerson,
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

// Delete a resource person by ID
export const deleteResourcePerson = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedPerson = await Author.findByIdAndDelete(id);

        if (!deletedPerson) {
            return res.status(404).json({
                success: false,
                message: "Resource person not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Resource person deleted successfully",
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};
