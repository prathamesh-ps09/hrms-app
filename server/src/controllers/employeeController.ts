import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await prisma.employee.findMany({
            select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
                department: true,
                designation: true,
                joiningDate: true,
                status: true,
                photoUrl: true,
                role: true,
            },
        });
        res.json(employees);
    } catch {
        res.status(500).json({ message: 'Error fetching employees' });
    }
};

export const getEmployeeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const employee = await prisma.employee.findUnique({
            where: { id: id as string },
            include: {
                attendance: true,
                leaves: true,
                timesheets: true,
            }
        });
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch {
        res.status(500).json({ message: 'Error fetching employee' });
    }
};

export const updateEmployee = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const employee = await prisma.employee.update({
            where: { id: id as string },
            data: req.body,
        });
        res.json(employee);
    } catch {
        res.status(500).json({ message: 'Error updating employee' });
    }
};
