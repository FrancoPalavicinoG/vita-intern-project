import { useState } from "react";
import { createAppointment } from "../api/appointments";

export function useRegisterSession() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    async function registerSession(clientId: number) {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);
            
            const response = await createAppointment(clientId);
            setSuccess("Session registered successfully" in response.data);

            return response.data;
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : "Error registering session");
        } finally {
            setLoading(false);
        }
    }

    return { registerSession, loading, error, success };
}