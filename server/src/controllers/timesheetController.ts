import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import prisma from '../lib/prisma';

export const saveTimesheet = async (req: AuthRequest, res: Response) => {
    const employeeId = req.user.id;
    const { weekStartDate, weekEndDate, status, totalHours, entries } = req.body;

    try {
        // Upsert timesheet
        const timesheet = await prisma.timesheet.upsert({
            where: {
                employeeId_weekStartDate: {
                    employeeId,
                    weekStartDate,
                },
            },
            update: {
                status,
                totalHours,
                submittedDate: status === 'Submitted' ? new Date().toISOString().split('T')[0] : null,
                entries: {
                    deleteMany: {}, // Clear existing entries and recreate
                    create: entries.map((e: any) => ({
                        projectId: e.projectId,
                        taskId: e.taskId,
                        monday: e.hours[0],
                        tuesday: e.hours[1],
                        wednesday: e.hours[2],
                        thursday: e.hours[3],
                        friday: e.hours[4],
                        saturday: e.hours[5],
                        sunday: e.hours[6],
                    })),
                },
            },
            create: {
                employeeId,
                weekStartDate,
                weekEndDate,
                status,
                totalHours,
                submittedDate: status === 'Submitted' ? new Date().toISOString().split('T')[0] : null,
                entries: {
                    create: entries.map((e: any) => ({
                        projectId: e.projectId,
                        taskId: e.taskId,
                        monday: e.hours[0],
                        tuesday: e.hours[1],
                        wednesday: e.hours[2],
                        thursday: e.hours[3],
                        friday: e.hours[4],
                        saturday: e.hours[5],
                        sunday: e.hours[6],
                    })),
                },
            },
            include: { entries: true },
        });
        res.json(timesheet);
    } catch (error) {
        console.error('Timesheet error:', error);
        res.status(500).json({ message: 'Error saving timesheet' });
    }
};

export const getMyTimesheets = async (req: AuthRequest, res: Response) => {
    const employeeId = req.user.id;
    try {
        const timesheets = await prisma.timesheet.findMany({
            where: { employeeId },
            include: { entries: true },
            orderBy: { weekStartDate: 'desc' },
        });
        res.json(timesheets);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching timesheets' });
    }
};
