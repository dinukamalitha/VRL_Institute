import { z } from "zod";

// Update journal content validation
export const updateJournalContentSchema = z.object({
  body: z.object({
    pageTitle: z.string().max(200).trim().optional(),
    welcomeText: z.string().max(5000).optional(),
    aimOfJournal: z.string().max(5000).optional(),
    peerReviewProcess: z.string().max(5000).optional(),
    publicationPolicy: z.string().max(5000).optional(),
    openAccessPolicy: z.string().max(5000).optional(),
    publisher: z.string().max(200).trim().optional(),
    chiefEditors: z.array(z.string().max(200).trim()).optional(),
    submissionEmail: z.string().email("Invalid email").max(200).trim().optional(),
    submissionText: z.string().max(5000).optional(),
    typographicGuidance: z.string().max(2000).optional(),
    maxWordCount: z.string().max(500).trim().optional(),
    referencingProfessionalism: z.string().max(2000).optional(),
    imageUrl: z.string().url("Invalid image URL").optional().nullable(),
  }),
});

