import { z } from "zod";

export const jobTypeEnum = z.enum(["fullTime", "partTime", "remote", "hybrid"]);

export const createJobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(2, "Location is required"),
  type: jobTypeEnum,
  companyId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid company ID"),
  isActive: z.boolean().optional(),
});

export const updateJobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .optional(),
  location: z.string().min(2, "Location is required").optional(),
  type: jobTypeEnum.optional(),
  isActive: z.boolean().optional(),
});

// Types
export type JobTypes = z.infer<typeof jobTypeEnum>;
export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
