import { Request, Response, NextFunction } from 'express';
import { getSummaryService } from '../services/summary.service';
import { summaryParamsSchema } from '../validation/summary.schema';
import { ZodError } from 'zod';

export async function getSummary(req: Request, res: Response, next: NextFunction) {
    try {
        const { date } = summaryParamsSchema.parse(req.params);

        const summary = await getSummaryService(date);

        return res.json({
            message: "Daily summary generated successfully",
            data: summary,
        });
    } catch (err: any) {
        console.error("Error in getSummary:", err);

        if (err instanceof ZodError) {
            return res.status(400).json({
                error: "Invalid date parameters",
                details: err.issues,
            });
        }

        if (err.message === "Invalid date") {
            return res.status(400).json({ error: err.message });
        }

        return res.status(500).json({ error: "Internal server error" });
    }
}
