import api from "./http";
import { type Client } from "../types/Client";


export async function getClients(): Promise<Client[]> {
    const response = await api.get("/clients");
    return response.data.data;
}