import { Router } from 'express';
import { saveTimesheet, getMyTimesheets } from '../controllers/timesheetController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/my', getMyTimesheets);
router.post('/save', saveTimesheet);

export default router;
