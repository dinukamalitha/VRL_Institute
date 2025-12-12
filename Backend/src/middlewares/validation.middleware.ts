import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

/**
 * Validation middleware factory
 * Validates request body, params, and query against a Zod schema
 */
export const validate = (schema: z.ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate all parts of the request
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format Zod errors for better readability
        const formattedErrors = error.issues.map((err: z.ZodIssue) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: formattedErrors,
        });
      }

      // Handle unexpected errors
      return res.status(500).json({
        success: false,
        message: "Internal server error during validation",
      });
    }
  };
};

