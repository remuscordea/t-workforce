import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  website: z.string().url("Invalid URL").optional(),
  industry: z.string().optional(),
  logoUrl: z.string().url("Invalid URL").optional(),
});

export const updateCompanySchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  website: z.string().url().optional(),
  industry: z.string().optional(),
  logoUrl: z.string().url().optional(),
});

// Types
export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;
