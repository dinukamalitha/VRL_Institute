import { z } from "zod";

// Create staff member validation
export const createStaffMemberSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").max(200).trim(),
    photo: z.string().url("Invalid photo URL").optional().nullable(),
    role: z.string().min(1, "Role is required").max(200).trim(),
    description: z.string().max(2000).optional().default(""),
  }),
});

// Update staff member validation
export const updateStaffMemberSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
  body: z.object({
    name: z.string().min(1).max(200).trim().optional(),
    photo: z.string().url().optional().nullable(),
    description: z.string().max(2000).optional(),
  }),
});

// Get staff member by ID validation
export const getStaffMemberByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});

// Delete staff member validation
export const deleteStaffMemberSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});

