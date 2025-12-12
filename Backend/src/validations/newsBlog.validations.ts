import { z } from "zod";

// Author schema
const authorSchema = z.object({
  name: z.string().min(1, "Author name is required").max(200).trim(),
  photo: z.string().url("Invalid photo URL").optional().nullable(),
  description: z.string().max(1000).optional().default(""),
});

// Flexible date validation - accepts ISO datetime, date strings, or null
// For updates, we're more lenient since dates can come in various formats
const dateSchema = z.union([
  z.string().datetime(),
  z.string(), // Accept any string - MongoDB/Mongoose will handle conversion
  z.null(),
  z.undefined(),
]).optional().nullable();

// Create news blog validation
export const createNewsBlogSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").max(500).trim(),
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required").max(100).trim(),
    status: z.enum(["Published", "Draft", "deleted"]).optional().default("Draft"),
    date: dateSchema,
    authors: z.array(authorSchema).min(1, "At least one author is required"),
    images: z.array(z.string().url("Invalid image URL")).optional().default([]),
  }),
});

// Update news blog validation (all fields optional)
export const updateNewsBlogSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
  body: z.object({
    title: z.string().min(1).max(500).trim().optional(),
    description: z.string().min(1).optional(),
    category: z.string().min(1).max(100).trim().optional(),
    status: z.enum(["Published", "Draft", "deleted"]).optional(),
    date: dateSchema,
    authors: z.array(authorSchema).min(1).optional(),
    images: z.array(z.string().url()).optional(),
  }),
});

// Get news blog by ID validation
export const getNewsBlogByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});

// Delete news blog validation
export const deleteNewsBlogSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});

