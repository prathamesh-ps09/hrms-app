import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma';
import { signToken } from '../utils/jwt';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const allEmployees = await prisma.employee.findMany({ select: { email: true } });
        console.log(`[AUTH DIAGNOSTIC] Login attempt for: ${email}`);
        console.log(`[AUTH DIAGNOSTIC] Total employees in DB: ${allEmployees.length}`);
        console.log(`[AUTH DIAGNOSTIC] Available emails: ${allEmployees.map(e => e.email).join(', ')}`);

        const employee = await prisma.employee.findUnique({
            where: { email },
        });

        if (!employee) {
            console.log(`[AUTH DIAGNOSTIC] Login failed: No employee found with email ${email}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log(`[AUTH DIAGNOSTIC] User found. Comparing passwords...`);

        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = signToken({
            id: employee.id,
            email: employee.email,
            role: employee.role,
        });

        res.json({
            token,
            user: {
                id: employee.id,
                fullName: employee.fullName,
                email: employee.email,
                role: employee.role,
                department: employee.department,
                designation: employee.designation,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
