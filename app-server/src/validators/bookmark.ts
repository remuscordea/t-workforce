import { z } from "zod";

export const bookmarkSchema = z.object({
  candidateId: z.string().min(1),
  jobId: z.string().min(1),
});

export type BookmarkInput = z.infer<typeof bookmarkSchema>;
