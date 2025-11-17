import { Request, Response, NextFunction } from 'express';
import { getSummaryService } from '../services/summary.service';
import { summaryParamsSchema } from '../validation/summary.schema';

export async function getSummary(req: Request, res: Response, next: NextFunction) {
    try {
        const { date } = summaryParamsSchema.parse(req.params);

        const summary = await getSummaryService(date);

        return res.json({
            message: "Daily summary generated successfully",
            data: summary,
        });
    } catch (err) {
        next(err);
    }
}
