import { useState, useEffect } from "react";
import { createAppointment } from "../api/appointments";

export function useRegisterSession() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        if (success || error) {
            const timer = setTimeout(() => {
                setSuccess(false);
                setError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [success, error]);


    async function registerSession(clientId: number) {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            const response = await createAppointment(clientId);
            setSuccess(true);

            return response.data;
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : "Error registering session");
            throw err; 
        } finally {
            setLoading(false);
        }
    }

    return { 
        registerSession, 
        loading, 
        error, 
        success,
    };
}