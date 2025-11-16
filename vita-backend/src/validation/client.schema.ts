import { z } from "zod";

export const clientSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  planName: z.string(),
  totalSessions: z.number().int(),
  usedSessions: z.number().int()
});

export const clientListResponseSchema = z.array(clientSchema);

export type ClientDTO = z.infer<typeof clientSchema>;