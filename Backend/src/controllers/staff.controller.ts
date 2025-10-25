import { Request, Response } from "express";
import Staff from "../models/staff";

// Create a new Staff Member
export const createStaffMember = async (req: Request, res: Response) => {
    try {
        const { name, photo, description } = req.body;

        const newPerson = new Staff({ name, photo, description });
        const savedPerson = await newPerson.save();

        res.status(201).json({
            success: true,
            message: "Staff Member created successfully",
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

// Get all Staff Members
export const getAllStaffMembers = async (_req: Request, res: Response) => {
    try {
        const staffMembers = await Staff.find().sort({ createdAt: 1 });
        res.status(200).json(staffMembers);
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get a Staff Member by ID
export const getStaffMemberById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const person = await Staff.findById(id);

        if (!person) {
            return res.status(404).json({
                success: false,
                message: "Staff Member not found",
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
export const updateStaffMember = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, photo, description } = req.body;

        const updatedPerson = await Staff.findByIdAndUpdate(
            id,
            { name, photo, description },
            { new: true, runValidators: true }
        );

        if (!updatedPerson) {
            return res.status(404).json({
                success: false,
                message: "Staff Member not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Staff Member updated successfully",
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

// Delete a Staff Member by ID
export const deleteStaffMember = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedPerson = await Staff.findByIdAndDelete(id);

        if (!deletedPerson) {
            return res.status(404).json({
                success: false,
                message: "Staff Member not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Staff Member deleted successfully",
        });
    } catch (err: any) {
        res.status(500).json({ success: false, message: err.message });
    }
};
