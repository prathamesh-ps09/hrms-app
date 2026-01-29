import React, { useState } from 'react';
import { Save, Send, Trash2, Plus, ArrowLeft } from 'lucide-react';
import type { Timesheet, TimesheetEntry } from '../types';
import '../styles/TimesheetEditor.css';

interface TimesheetEditorProps {
    timesheet: Timesheet | null;
    employeeId: string;
    onSave: (timesheet: Timesheet) => void;
    onCancel: () => void;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const TimesheetEditor: React.FC<TimesheetEditorProps> = ({ timesheet, employeeId, onSave, onCancel }) => {
    // Determine dates for the current/selected week
    // Simplified date logic for demo (defaults to current week if new)
    const [weekStart] = useState(() => timesheet?.weekStartDate || new Date().toISOString().split('T')[0]);
    const [weekEnd] = useState(() => timesheet?.weekEndDate || new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

    const [entries, setEntries] = useState<TimesheetEntry[]>(timesheet?.entries || [
        { projectId: 'Project A', taskId: 'Development', hours: [0, 0, 0, 0, 0, 0, 0] }
    ]);

    const handleEntryChange = (index: number, field: keyof TimesheetEntry | 'hours', value: string | number, dayIndex?: number) => {
        const newEntries = [...entries];
        if (field === 'hours' && dayIndex !== undefined) {
            newEntries[index].hours[dayIndex] = Number(value) || 0;
        } else if (field !== 'hours') {
            // @ts-expect-error: dynamic field assignment
            newEntries[index][field] = value;
        }
        setEntries(newEntries);
    };

    const addRow = () => {
        setEntries([...entries, { projectId: '', taskId: '', hours: [0, 0, 0, 0, 0, 0, 0] }]);
    };

    const removeRow = (index: number) => {
        setEntries(entries.filter((_, i) => i !== index));
    };

    const calculateTotal = () => {
        return entries.reduce((total: number, entry: TimesheetEntry) => total + entry.hours.reduce((sum: number, h: number) => sum + h, 0), 0);
    };

    const handleSave = (status: Timesheet['status']) => {
        const total = calculateTotal();
        const newTimesheet: Timesheet = {
            id: timesheet?.id || `TS${Date.now()}`,
            employeeId,
            weekStartDate: weekStart,
            weekEndDate: weekEnd,
            entries,
            status,
            totalHours: total,
            submittedDate: status === 'Submitted' ? new Date().toISOString().split('T')[0] : undefined
        };
        onSave(newTimesheet);
    };

    return (
        <div className="timesheet-editor">
            <div className="editor-header">
                <button className="btn-icon" onClick={onCancel}><ArrowLeft size={20} /></button>
                <h3>{timesheet ? 'Edit Timesheet' : 'New Timesheet'}</h3>
                <div className="week-display">
                    Week: {weekStart} to {weekEnd}
                </div>
            </div>

            <div className="grid-container">
                <div className="grid-header-row">
                    <div className="col-project">Project / Task</div>
                    {DAYS.map(day => <div key={day} className="col-day">{day}</div>)}
                    <div className="col-action"></div>
                </div>

                {entries.map((entry, index) => (
                    <div key={index} className="grid-row">
                        <div className="col-project">
                            <input
                                type="text"
                                placeholder="Project Name"
                                value={entry.projectId}
                                onChange={(e) => handleEntryChange(index, 'projectId', e.target.value)}
                                className="input-project"
                            />
                            <input
                                type="text"
                                placeholder="Task"
                                value={entry.taskId}
                                onChange={(e) => handleEntryChange(index, 'taskId', e.target.value)}
                                className="input-task"
                            />
                        </div>
                        {entry.hours.map((hour, dayIdx) => (
                            <div key={dayIdx} className="col-day">
                                <input
                                    type="number"
                                    min="0"
                                    max="24"
                                    value={hour || ''}
                                    onChange={(e) => handleEntryChange(index, 'hours', e.target.value, dayIdx)}
                                    className="input-hour"
                                />
                            </div>
                        ))}
                        <div className="col-action">
                            <button className="btn-delete" onClick={() => removeRow(index)}><Trash2 size={16} /></button>
                        </div>
                    </div>
                ))}
            </div>

            <button className="btn-add-row" onClick={addRow}>
                <Plus size={16} /> Add Row
            </button>

            <div className="editor-footer">
                <div className="total-display">Total Hours: <strong>{calculateTotal()}</strong></div>
                <div className="action-buttons">
                    <button className="btn-secondary" onClick={() => handleSave('Draft')}>
                        <Save size={18} /> Save Draft
                    </button>
                    <button className="btn-primary" onClick={() => handleSave('Submitted')}>
                        <Send size={18} /> Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimesheetEditor;
