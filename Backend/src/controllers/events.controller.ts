import { Request, Response } from "express";
import Event from "../models/Event";

// Create a new event
export const createEvent = async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            location,
            medium,
            status,
            date,
            time,
            authors,
            thumbnail,
            registrationLink,
        } = req.body;

        const event = new Event({
            title,
            description,
            location,
            medium,
            status,
            date,
            time,
            authors,
            thumbnail,
            registrationLink,
        });

        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};

// Get all events
export const getAllEvents = async (_req: Request, res: Response) => {
    try {
        const events = await Event.find({ status: "active" }).sort({ timestamp: -1 });
        res.json(events);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

// Get event by ID
export const getEventById = async (req: Request, res: Response) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ error: "Event not found" });
        res.json(event);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

// Update event (partial update with PATCH)
export const updateEvent = async (req: Request, res: Response) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedEvent)
            return res.status(404).json({ error: "Event not found" });

        res.json(updatedEvent);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
};


// Soft delete event (mark as deleted)
export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const deletedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            { $set: { status: "deleted" } },
            { new: true }
        );

        if (!deletedEvent)
            return res.status(404).json({ error: "Event not found" });

        res.json({ message: "Event marked as deleted", event: deletedEvent });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};