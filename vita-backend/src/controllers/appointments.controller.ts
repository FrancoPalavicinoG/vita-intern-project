import { Request, Response, NextFunction } from "express";
import { createAppointmentService } from "../services/appointments.service";
import { createAppointmentSchema } from "../validation/appointment.schema";

export async function createAppointment(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        // 1. Validar entrada
        const parsed = createAppointmentSchema.parse(req.body);
        // 2. Crear cita
        const appointment = await createAppointmentService(parsed);
        // 3. Retornar respuesta
        return res.status(201).json({ 
            message: "Appointment created successfully",
            data: appointment,
        });
    } catch (err) {
        next(err);
    }
}