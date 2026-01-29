import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import prisma from '../lib/prisma';
import { format } from 'date-fns';

export const markAttendance = async (req: AuthRequest, res: Response) => {
    const employeeId = req.user!.id;
    const { status } = req.body;
    const today = format(new Date(), 'yyyy-MM-dd');

    try {
        const record = await prisma.attendanceRecord.create({
            data: {
                employeeId,
                date: today,
                status,
                clockIn: new Date().toLocaleTimeString(),
            },
        });
        res.status(201).json(record);
    } catch {
        res.status(500).json({ message: 'Error marking attendance' });
    }
};

export const clockOut = async (req: AuthRequest, res: Response) => {
    const employeeId = req.user!.id;
    const today = format(new Date(), 'yyyy-MM-dd');

    try {
        const record = await prisma.attendanceRecord.update({
            where: {
                employeeId_date: {
                    employeeId,
                    date: today,
                },
            },
            data: {
                clockOut: new Date().toLocaleTimeString(),
            },
        });
        res.json(record);
    } catch {
        res.status(500).json({ message: 'Error clocking out' });
    }
};

export const getMyAttendance = async (req: AuthRequest, res: Response) => {
    const employeeId = req.user!.id;
    try {
        const records = await prisma.attendanceRecord.findMany({
            where: { employeeId },
            orderBy: { date: 'desc' },
        });
        res.json(records);
    } catch {
        res.status(500).json({ message: 'Error fetching attendance' });
    }
};
