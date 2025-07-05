import { z } from "zod";

export const createCandidateSchema = z.object({
  phone: z
    .string()
    .min(6, "Phone number must be at least 6 characters")
    .optional(),
  location: z.string().min(2, "Location is required").optional(),
  experienceLevel: z.string().optional(),
  skills: z.array(z.string()).optional(),
  languages: z
    .array(z.string().min(2, "Each language must be at least 2 characters"))
    .optional(),
  education: z
    .string()
    .min(2, "Education must be at least 2 characters")
    .optional(),
  cvUrl: z.string().url().optional(),
});

export const updateCandidateSchema = createCandidateSchema;

// Types
export type CreateCandidateInput = z.infer<typeof createCandidateSchema>;
export type UpdateCandidateInput = z.infer<typeof updateCandidateSchema>;
