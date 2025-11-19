import { useEffect, useState } from "react";
import { type Client } from "../types/Client";
import { getClients } from "../api/clients";

export function useClients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    async function loadClients() {
        try {
            setLoading(true);
            const data = await getClients();
            setClients(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error fetching clients");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadClients();
    }, []);

    const updateClientLocally = (clientId: number, updates: Partial<Client>) => {
        setClients((prevClients) =>
            prevClients.map((client) =>
                client.id === clientId ? { ...client, ...updates } : client
            )
        );
    };

    return { 
        clients, 
        loading, 
        error,
        updateClientLocally 
    };
}