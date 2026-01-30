import { Router } from 'express';
import { getAllEmployees, getEmployeeById, updateEmployee, addEmployee, deleteEmployee } from '../controllers/employeeController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticate);

router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.post('/', authorize(['ADMIN']), addEmployee);
router.put('/:id', authorize(['ADMIN']), updateEmployee);
router.delete('/:id', authorize(['ADMIN']), deleteEmployee);

export default router;
