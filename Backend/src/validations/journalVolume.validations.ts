import { z } from "zod";

// Create journal volume validation
export const createJournalVolumeSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").max(500).trim(),
    thumbnail: z.string().url("Invalid thumbnail URL").optional().nullable(),
    documentUrl: z.string().url("Invalid document URL").optional().nullable(),
  }),
});

// Update journal volume validation
export const updateJournalVolumeSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
  body: z.object({
    title: z.string().min(1).max(500).trim().optional(),
    thumbnail: z.string().url().optional().nullable(),
    publisher: z.string().max(200).trim().optional(),
    documentUrl: z.string().url().optional().nullable(),
  }),
});

// Get journal volume by ID validation
export const getJournalVolumeByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});

// Delete journal volume validation
export const deleteJournalVolumeSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});

// Stream journal volume PDF validation
export const streamJournalVolumePdfSchema = z.object({
  query: z.object({
    fullPath: z.string().min(1, "fullPath is required").optional(),
    fullpath: z.string().min(1, "fullPath is required").optional(),
  }).refine((data) => data.fullPath || data.fullpath, {
    message: "fullPath or fullpath query parameter is required",
  }),
});

