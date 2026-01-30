export interface Employee {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    department: string;
    designation: string;
    joiningDate: string;
    managerId?: string;
    status: 'Active' | 'On Leave' | 'Terminated';
    photoUrl?: string; // We'll just use placeholders for now
}

export interface AttendanceRecord {
    id: string;
    employeeId: string;
    date: string;
    status: 'Present' | 'Absent' | 'Half Day' | 'Work From Home';
    clockIn?: string;
    clockOut?: string;
}

export interface LeaveRequest {
    id: string;
    employeeId: string;
    type: 'Sick Leave' | 'Casual Leave' | 'Paid Leave' | 'Unpaid Leave';
    startDate: string;
    endDate: string;
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    appliedDate: string;
}

export interface Department {
    id: string;
    name: string;
}

export interface TimesheetEntry {
    projectId: string;
    taskId: string;
    hours: number[]; // Array of 7 numbers (Mon-Sun)
}

export interface Timesheet {
    id: string;
    employeeId: string;
    weekStartDate: string; // ISO Date YYYY-MM-DD
    weekEndDate: string;   // ISO Date YYYY-MM-DD
    entries: TimesheetEntry[];
    status: 'Draft' | 'Submitted' | 'Approved' | 'Rejected';
    totalHours: number;
    submittedDate?: string;
}
