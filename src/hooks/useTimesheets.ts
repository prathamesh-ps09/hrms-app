import { useContext } from 'react';
import { TimesheetContext } from '../context/TimesheetContext';

// eslint-disable-next-line react-refresh/only-export-components
export const useTimesheets = () => {
    const context = useContext(TimesheetContext);
    if (context === undefined) {
        throw new Error('useTimesheets must be used within a TimesheetProvider');
    }
    return context;
};
