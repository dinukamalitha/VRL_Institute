import { z } from "zod";

// Create resource person validation
export const createResourcePersonSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").max(200).trim(),
    photo: z.string().url("Invalid photo URL").optional().nullable(),
    description: z.string().max(2000).optional().default(""),
  }),
});

// Update resource person validation
export const updateResourcePersonSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
  body: z.object({
    name: z.string().min(1).max(200).trim().optional(),
    photo: z.string().url().optional().nullable(),
    description: z.string().max(2000).optional(),
  }),
});

// Get resource person by ID validation
export const getResourcePersonByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});

// Delete resource person validation
export const deleteResourcePersonSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});

