import { Request, Response } from "express";
import { listClients } from "../services/clients.service";
import { clientListResponseSchema } from "../validation/client.schema";
import { ZodError } from "zod";

export async function getClients(req: Request, res: Response) {
  try {
    const clients = await listClients();

    const parsed = clientListResponseSchema.parse(clients);

    return res.json({
      data: parsed,
      count: parsed.length
    });
  } catch (err: any) {
    console.error("Error in getClients:", err);

    if (err instanceof ZodError) {
      return res.status(500).json({
          error: "Response schema validation failed",
          issues: err.issues,
      });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}