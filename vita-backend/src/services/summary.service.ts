import { pool } from "../db";

export async function getSummaryService(date: string) {
    // 1. Citas del dia 
    const [appointmentRows] = await pool.query(
        ` SELECT
            a.id, 
            a.clientId,
            a.date,
            c.name,
            c.email,
            c.phone,
            c.planName
          FROM appointments AS a
          JOIN clients AS c ON a.clientId = c.id
          WHERE DATE(a.date) = ?
          ORDER BY a.date ASC
        `, [date]
    );

    const appointments = appointmentRows as any[];  

    // 2. Calcular datos resumen
    const totalAppointments = appointments.length;
    const uniqueClients = new Set(appointments.map(a => a.clientId)).size;

    return {
        date, 
        totalAppointments,
        uniqueClients,
        sessionUssed: totalAppointments,
        appointments: appointments.map(a => ({
            id: a.id,
            clientId: a.clientId,
            date: a.date,
            name: a.name,
            email: a.email,
            phone: a.phone,
            planName: a.planName
        })),
    };
}