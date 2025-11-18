import { Request, Response, NextFunction } from "express";
import { createAppointmentService } from "../services/appointments.service";
import { createAppointmentSchema } from "../validation/appointment.schema";
import { ZodError } from "zod";

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
    } catch (err: any) {
        console.error("Error in createAppointment:", err);
        
        if (err instanceof ZodError) {
            return res.status(400).json({
                error: "Invalid request data",
                details: err.issues,
            });
        }

        if (err.message === "Cliente not found" ) {
            return res.status(404).json({ error: err.message });
        }

        if (err.message === "No available sessions for this client") {
            return res.status(400).json({ error: err.message });
        }

        return res.status(500).json({ error: "Internal server error" });
    }
}