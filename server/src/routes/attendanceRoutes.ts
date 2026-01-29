import { Router } from 'express';
import { markAttendance, clockOut, getMyAttendance } from '../controllers/attendanceController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/my', getMyAttendance);
router.post('/mark', markAttendance);
router.put('/clock-out', clockOut);

export default router;
