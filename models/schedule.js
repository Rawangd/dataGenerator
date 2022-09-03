import mongoose from 'mongoose'

const scheduleSchema = new mongoose.Schema(
    {
        qty: {
            type: Number,
            required: true,
        },
        productId: {
            type: String,
            required: true,
        },
        sellerId: {
            type: String,
            required: true,
        },
        dateTime: {
            type: Date,
        },
        left: {
            type: Number,
            min: 0,
        },
        suspended: {
            type: Boolean,
            default: false,
        },
        ready: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

export const Schedule = mongoose.model('Schedule', scheduleSchema, 'schedules')