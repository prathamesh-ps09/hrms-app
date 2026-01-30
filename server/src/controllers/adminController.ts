import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const getAdminStats = async (req: Request, res: Response) => {
    try {
        const [totalEmployees, pendingLeaves, totalTimesheets] = await Promise.all([
            prisma.employee.count(),
            prisma.leaveRequest.count({ where: { status: 'Pending' } }),
            prisma.timesheet.count(),
        ]);

        const departmentStats = await prisma.employee.groupBy({
            by: ['department'],
            _count: {
                id: true,
            },
        });

        res.json({
            totalEmployees,
            pendingLeaves,
            totalTimesheets,
            departmentStats: departmentStats.map(stat => ({
                department: stat.department,
                count: stat._count.id,
            })),
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        res.status(500).json({ message: 'Error fetching admin statistics' });
    }
};
