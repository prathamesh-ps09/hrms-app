import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('password123', 10);

    const employees = [
        {
            id: 'EMP001',
            fullName: 'Harry Power',
            email: 'harry@company.com',
            password: hashedPassword,
            phone: '555-0100',
            department: 'Engineering',
            designation: 'Senior Developer',
            joiningDate: '2023-01-15',
            status: 'Active',
            role: 'ADMIN',
        },
        {
            id: 'EMP002',
            fullName: 'Sarah Miller',
            email: 'sarah@company.com',
            password: hashedPassword,
            phone: '555-0101',
            department: 'Design',
            designation: 'UI/UX Designer',
            joiningDate: '2023-03-10',
            status: 'Active',
            role: 'EMPLOYEE',
        },
        {
            id: 'EMP003',
            fullName: 'John Doe',
            email: 'john@company.com',
            password: hashedPassword,
            phone: '555-0102',
            department: 'Marketing',
            designation: 'Marketing Manager',
            joiningDate: '2022-11-05',
            status: 'On Leave',
            role: 'EMPLOYEE',
        },
    ];

    for (const emp of employees) {
        await prisma.employee.upsert({
            where: { email: emp.email },
            update: {},
            create: emp,
        });
    }

    console.log('Seed data created successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
