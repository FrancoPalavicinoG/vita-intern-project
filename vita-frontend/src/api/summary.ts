import api from "./http";
import { type Summary } from "../types/Summary";

export async function getDailySummary(date: string): Promise<Summary> {
    const response = await api.get(`/summary/${date}`);
    return response.data.data;
}