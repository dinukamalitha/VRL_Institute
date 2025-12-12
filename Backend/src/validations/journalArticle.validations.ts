import { z } from "zod";

// Author schema for journal articles
const journalAuthorSchema = z.object({
  name: z.string().min(1, "Author name is required").max(200).trim(),
  affiliation: z.string().max(500).optional().nullable(),
  email: z.string().email("Invalid email").optional().nullable(),
  photo: z.string().url("Invalid photo URL").optional().nullable(),
});

// Create journal article validation
export const createJournalArticleSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").max(500).trim(),
    abstract: z.string().min(1, "Abstract is required").max(5000),
    category: z.string().min(1, "Category is required").max(100).trim(),
    authors: z.array(journalAuthorSchema).min(1, "At least one author is required"),
    volume: z.string().min(1, "Volume is required").max(50).trim(),
    issue: z.string().min(1, "Issue is required").max(50).trim(),
    keywords: z.array(z.string().max(100).trim()).optional().default([]),
    documentUrl: z.string().url("Invalid document URL").optional().nullable(),
    peerReviewed: z.boolean().optional().default(true),
  }),
});

// Update journal article validation
export const updateJournalArticleSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
  body: z.object({
    title: z.string().min(1).max(500).trim().optional(),
    abstract: z.string().min(1).max(5000).optional(),
    category: z.string().min(1).max(100).trim().optional(),
    authors: z.array(journalAuthorSchema).min(1).optional(),
    volume: z.string().min(1).max(50).trim().optional(),
    issue: z.string().min(1).max(50).trim().optional(),
    keywords: z.array(z.string().max(100).trim()).optional(),
    documentUrl: z.string().url().optional().nullable(),
    peerReviewed: z.boolean().optional(),
  }),
});

// Get journal article by ID validation
export const getJournalArticleByIdSchema = z.object({
  params: z.object({
    articleId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});

// Get journal articles by volume/issue validation
export const getJournalArticlesByVolumeIssueSchema = z.object({
  params: z.object({
    volume: z.string().min(1).max(50).trim(),
    issue: z.string().min(1).max(50).trim(),
  }),
});

// Get journal articles by category validation
export const getJournalArticlesByCategorySchema = z.object({
  params: z.object({
    category: z.string().min(1).max(100).trim(),
  }),
});

// Get latest journal articles validation
export const getLatestJournalArticlesSchema = z.object({
  query: z.object({
    limit: z.string().regex(/^\d+$/).transform(Number).pipe(z.number().int().min(1).max(100)).optional().default(5),
  }),
});

// Delete journal article validation
export const deleteJournalArticleSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});

// Download journal article PDF validation
export const downloadJournalArticlePdfSchema = z.object({
  query: z.object({
    fullPath: z.string().min(1, "fullPath is required").optional(),
    fullpath: z.string().min(1, "fullPath is required").optional(),
  }).refine((data) => data.fullPath || data.fullpath, {
    message: "fullPath or fullpath query parameter is required",
  }),
});

