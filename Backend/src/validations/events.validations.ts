import { z } from "zod";

// Author schema for events
const eventAuthorSchema = z.object({
  name: z.string().min(1, "Author name is required").max(200).trim(),
  photo: z.string().url("Invalid photo URL").optional().nullable(),
  description: z.string().max(1000).optional().default(""),
});

// Create event validation
export const createEventSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").max(500).trim(),
    description: z.string().min(1, "Description is required"),
    location: z.string().max(200).trim().optional().nullable(),
    medium: z.string().max(100).trim().optional().nullable(),
    status: z.enum(["active", "inactive", "deleted"]).optional().default("active"),
    date: z.union([
      z.string().datetime(),
      z.string(), // Accept any string - MongoDB/Mongoose will handle conversion
      z.null(),
      z.undefined(),
    ]).optional().nullable(),
    time: z.string().max(50).trim().optional().nullable(),
    authors: z.array(eventAuthorSchema).optional().default([]),
    thumbnail: z.string().url("Invalid thumbnail URL").optional().nullable(),
    registrationLink: z.string().url("Invalid registration link URL").optional().nullable(),
  }),
});

// Update event validation
export const updateEventSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
  body: z.object({
    title: z.string().min(1).max(500).trim().optional(),
    description: z.string().min(1).optional(),
    location: z.string().max(200).trim().optional().nullable(),
    medium: z.string().max(100).trim().optional().nullable(),
    status: z.enum(["active", "inactive", "deleted"]).optional(),
    date: z.union([
      z.string().datetime(),
      z.string(), // Accept any string - MongoDB/Mongoose will handle conversion
      z.null(),
      z.undefined(),
    ]).optional().nullable(),
    time: z.string().max(50).trim().optional().nullable(),
    authors: z.array(eventAuthorSchema).optional(),
    thumbnail: z.string().url().optional().nullable(),
    registrationLink: z.string().url().optional().nullable(),
  }),
});

// Get event by ID validation
export const getEventByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});

// Delete event validation
export const deleteEventSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});

