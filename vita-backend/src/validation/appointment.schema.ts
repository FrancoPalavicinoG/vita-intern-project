import { z } from "zod";

export const createAppointmentSchema = z.object({
    clientId: z.number().int(),
    date: z.string().datetime().optional(),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;

export const appointmentSchema = z.object({
    id: z.number().int(),
    clientId: z.number().int(),
    date: z.string()
    });

export const appointmentListResponseSchema = z.array(appointmentSchema);
export type AppointmentDTO = z.infer<typeof appointmentSchema>;