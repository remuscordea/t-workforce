import { z } from "zod";

export const applicationStatusEnum = z.enum([
  "PENDING",
  "IN_REVIEW",
  "INTERVIEW",
  "REJECTED",
  "ACCEPTED",
]);

export const createApplicationSchema = z.object({
  candidateId: z.string().uuid(),
  jobId: z.string().uuid(),
  notes: z.string().optional(),
});

export const updateApplicationStatusSchema = z.object({
  applicationId: z.string().uuid(),
  status: applicationStatusEnum,
  notes: z.string().optional(),
});

// Types
export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationStatusInput = z.infer<
  typeof updateApplicationStatusSchema
>;
export type ApplicationStatuses = z.infer<typeof applicationStatusEnum>;
