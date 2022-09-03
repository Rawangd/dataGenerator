import mongoose from 'mongoose'

const empScheduleSchema = new mongoose.Schema(
    {
        // the supposed working hours of the employee
        // weeklyHours: Number,
        // offDays: [Number],
        startTime: String,
        endTime: String,
        entries: [
            {
                enter: Date,
                exit: Date,
            },
        ],
        maxDelay: Number, // In minutes
    },
    {
        timestamps: true,
    }
)

export const EmpSchedule = mongoose.model(
    'EmpSchedule',
    empScheduleSchema,
    'empSchedules'
)