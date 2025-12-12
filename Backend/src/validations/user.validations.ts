import { z } from "zod";

// User registration validation
export const registerUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long").trim(),
    email: z.string().email("Invalid email address").toLowerCase().trim(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
    role: z.enum(["admin", "user"]).optional().default("user"),
  }),
});

// User login validation
export const loginUserSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email address").toLowerCase().trim(),
    password: z.string().min(1, "Password is required"),
  }),
});

// MongoDB ObjectId validation
export const mongoIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format"),
  }),
});

