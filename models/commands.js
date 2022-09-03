import mongoose from 'mongoose'


const commandSchema = new mongoose.Schema(
    {

        products: [
            {
                productId: String,
                productName: String,
                qty: Number,
                scheduleId: String,
            },
        ],
        sellerId: {
            type: String,
            required: true,
        },
        buyerId: {
            type: String,
            required: true,
        },
        totalPrice: Number,
        startTime: {
            type: Date,
            default: Date.now(),
        },
        endTime: {
            type: Date,
            min: Date.now(),
        },
        delivered: {
            type: Boolean,
            default: false,
        },
        deliveredAt: {
            type: Date,
            min: Date.now(),
        },
        confirmedAt: {
            type: Date,
            min: Date.now(),
        },
        rejectedAt: {
            type: Date,
            min: Date.now(),
        },
        notes: String,
        canceledAt: {
            type: Date,
            min: Date.now(),
        },
        status: Number,
    },
    {
        timestamps: true,
       // _id: false,
    }
)


export const Command = mongoose.model('Command', commandSchema, 'commands')