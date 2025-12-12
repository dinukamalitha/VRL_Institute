import { z } from "zod";

// Author schema for publications
const publicationAuthorSchema = z.object({
  name: z.string().min(1, "Author name is required").max(200).trim(),
  affiliation: z.string().max(500).optional().nullable(),
  email: z.string().email("Invalid email").optional().nullable(),
  photo: z.string().url("Invalid photo URL").optional().nullable(),
});

// Create publication validation
export const createPublicationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").max(500).trim(),
    documentUrl: z.string().url("Invalid document URL").optional().nullable(),
    category: z.string().min(1, "Category is required").max(100).trim(),
    authors: z.array(publicationAuthorSchema).optional().default([]),
    thumbnail: z.string().url("Invalid thumbnail URL").optional().nullable(),
    authorImage: z.string().url("Invalid author image URL").optional().nullable(),
  }),
});

// Update publication validation
export const updatePublicationSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
  body: z.object({
    title: z.string().min(1).max(500).trim().optional(),
    documentUrl: z.string().url().optional().nullable(),
    category: z.string().min(1).max(100).trim().optional(),
    authors: z.array(publicationAuthorSchema).optional(),
    thumbnail: z.string().url().optional().nullable(),
    authorImage: z.string().url().optional().nullable(),
  }),
});

// Get publication by ID validation
export const getPublicationByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});

// Get publications by category validation
export const getPublicationsByCategorySchema = z.object({
  params: z.object({
    category: z.string().min(1).max(100).trim(),
  }),
});

// Delete publication validation
export const deletePublicationSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});

// Generate signed PDF URL validation
export const generateSignedPdfUrlSchema = z.object({
  query: z.object({
    fullPath: z.string().min(1, "fullPath is required").optional(),
    fullpath: z.string().min(1, "fullPath is required").optional(),
  }).refine((data) => data.fullPath || data.fullpath, {
    message: "fullPath or fullpath query parameter is required",
  }),
});

