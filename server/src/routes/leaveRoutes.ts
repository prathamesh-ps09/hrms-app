import { Router } from 'express';
import { applyLeave, getMyLeaves, updateLeaveStatus } from '../controllers/leaveController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/my', getMyLeaves);
router.post('/apply', applyLeave);
router.put('/:id/status', authorize(['ADMIN']), updateLeaveStatus);

export default router;
