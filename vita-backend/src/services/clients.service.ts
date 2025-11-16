import { Client } from "../types/client";
import { pool } from "../db";

export async function listClients(): Promise<Client[]> {
  const [rows] = await pool.query("SELECT * FROM clients");

  return rows as Client[];
}