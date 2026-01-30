import { useContext } from 'react';
import { TimesheetContext } from '../context/TimesheetContext';


export const useTimesheets = () => {
    const context = useContext(TimesheetContext);
    if (context === undefined) {
        throw new Error('useTimesheets must be used within a TimesheetProvider');
    }
    return context;
};
