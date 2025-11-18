import { useEffect, useState } from "react";
import { type Client } from "../types/Client";
import { getClients } from "../api/clients";

export function useClients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getClients()
            .then((data) => setClients(data))
            .catch((err) => setError(err.message || "Error fetching clients"))
            .finally(() => setLoading(false));
    }, []);

    return { clients, loading, error };
}