import { z } from "zod";

// Update home content validation
export const updateHomeContentSchema = z.object({
  body: z.object({
    visionText: z.string().max(5000).optional(),
    purposeText: z.string().max(5000).optional(),
  }),
});

