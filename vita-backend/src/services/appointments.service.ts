import { pool } from "../db";
import { CreateAppointmentInput } from "../validation/appointment.schema";

export async function createAppointmentService( data: CreateAppointmentInput) {
    const { clientId, date } = data;

    // 1. Verificar cliente
    const [clientRows] = await pool.query(
        "SELECT * FROM clients WHERE id = ?",
        [clientId]
    );

    const client = (clientRows as any[])[0];

    if (!client) {
        throw new Error("Client not found");
    }

    // 2. Verificar sesiones disponibles
    if (client.usedSessions >= client.totalSessions) {
        throw new Error("No available sessions for this client");
    }

    // 3. Transacción
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const appointmentDate = date ? new Date(date) : new Date();

        // 4. Insertar cita
        const [result] = await connection.query(
            "INSERT INTO appointments (clientId, date) VALUES (?, ?)",
            [clientId, appointmentDate]
        );

        const appointmentId = (result as any).insertId;

        // 5. Incrementar sesiones usadas
        await connection.query(
            "UPDATE clients SET usedSessions = usedSessions + 1 WHERE id = ?",
            [clientId]
        );

        await connection.commit();
        connection.release();

        // 6. Devolver resultado
        return {
            id: appointmentId,
            clientId,
            date: appointmentDate.toISOString(),
            remainingSessions: client.totalSessions - (client.usedSessions + 1),
        };
    } catch (error) {
        await connection.rollback();
        connection.release();
        throw error;
    }
}



