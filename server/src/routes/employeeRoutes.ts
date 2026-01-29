import { Router } from 'express';
import { getAllEmployees, getEmployeeById, updateEmployee } from '../controllers/employeeController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.put('/:id', authorize(['ADMIN']), updateEmployee);

export default router;
