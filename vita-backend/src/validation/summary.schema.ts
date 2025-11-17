import { z } from "zod";

export const summaryParamsSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "date must be in format YYYY-MM-DD"
  })
});

export type SummaryParams = z.infer<typeof summaryParamsSchema>;