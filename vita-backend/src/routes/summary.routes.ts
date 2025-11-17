import { Router } from 'express';
import { getSummary } from '../controllers/summary.controller';

const router = Router();

router.get('/:date', getSummary);

export default router;