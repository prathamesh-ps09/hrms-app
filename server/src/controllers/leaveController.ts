import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import prisma from '../lib/prisma';

export const applyLeave = async (req: AuthRequest, res: Response) => {
    const employeeId = req.user.id;
    const { type, startDate, endDate, reason } = req.body;

    try {
        const leave = await prisma.leaveRequest.create({
            data: {
                employeeId,
                type,
                startDate,
                endDate,
                reason,
                appliedDate: new Date().toISOString().split('T')[0],
            },
        });
        res.status(201).json(leave);
    } catch (error) {
        res.status(500).json({ message: 'Error applying for leave' });
    }
};

export const getMyLeaves = async (req: AuthRequest, res: Response) => {
    const employeeId = req.user.id;
    try {
        const leaves = await prisma.leaveRequest.findMany({
            where: { employeeId },
            orderBy: { appliedDate: 'desc' },
        });
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leaves' });
    }
};

export const updateLeaveStatus = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const leave = await prisma.leaveRequest.update({
            where: { id: id as string },
            data: { status },
        });
        res.json(leave);
    } catch (error) {
        res.status(500).json({ message: 'Error updating leave status' });
    }
};
