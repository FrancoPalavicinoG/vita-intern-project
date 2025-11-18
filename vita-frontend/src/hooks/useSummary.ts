import { useEffect, useState } from "react";
import { getDailySummary } from "../api/summary";
import { type Summary } from "../types/Summary";

export function useSummary(date: string) {
    const [summary, setSummary] = useState<Summary | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getDailySummary(date)
            .then(setSummary)
            .catch(() => setError("Failed to fetch summary"))
            .finally(() => setLoading(false));
    }, [date]);

    return { summary, loading, error };
}