import React, { useState } from 'react';
import TimesheetList from '../components/TimesheetList';
import TimesheetEditor from '../components/TimesheetEditor';
import { useTimesheets } from '../hooks/useTimesheets';
import { useAuth } from '../hooks/useAuth';
import type { Timesheet } from '../types';

const Timesheets: React.FC = () => {
    const { getEmployeeTimesheets, saveTimesheet } = useTimesheets();
    const { user } = useAuth();
    const currentUserId = user?.id || '';

    // View state: 'list' or 'edit'
    const [view, setView] = useState<'list' | 'edit'>('list');
    const [selectedTimesheet, setSelectedTimesheet] = useState<Timesheet | null>(null);

    const timesheets = getEmployeeTimesheets(currentUserId);

    const handleEdit = (ts: Timesheet) => {
        setSelectedTimesheet(ts);
        setView('edit');
    };

    const handleNew = () => {
        setSelectedTimesheet(null);
        setView('edit');
    };

    const handleSave = (ts: Timesheet) => {
        saveTimesheet(ts);
        setView('list');
    };

    return (
        <div style={{ paddingBottom: '80px' }}>
            <h1 className="page-title">My Timesheets</h1>

            {view === 'list' ? (
                <TimesheetList
                    timesheets={timesheets}
                    onSelect={handleEdit}
                    onNew={handleNew}
                />
            ) : (
                <TimesheetEditor
                    timesheet={selectedTimesheet}
                    employeeId={currentUserId}
                    onSave={handleSave}
                    onCancel={() => setView('list')}
                />
            )}
        </div>
    );
};

export default Timesheets;