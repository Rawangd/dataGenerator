import mongoose from 'mongoose'

const storeSchema = new mongoose.Schema(
    {
        storeImage: {
            type: String,
            default: '',
        },
        ownerId: {
            type: String,
            required: true,
        },
        storeName: {
            type: String,
            required: true,
            min: 3,
            max: 20,
        },
        address: String,
        maxDelay: { type: Number, default: 30 },
        storeImageHash: String,
        location: {
            type: {
                type: String, // Don't do `{ location: { type: String } }`
                enum: ['Point'], // 'location.type' must be 'Point'
            },
            coordinates: {
                type: [String],
            },
        },
        clients: {
            type: Array,
        },
        phone: {
            type: String,
            minlength: 8,
            maxlength: 8,
            trim: true,
        },
        employees: {
            type: Array,
        },
        products: [],
        workingDays: {
            type: [
                {
                    open: String,
                    close: String,
                },
            ],
           /* validate: [
                workingDaysValidator,
                '{PATH} should be an array of 7 items.',
            ],*/
        },
        ratings: {
            reviewers: { type: Number, default: 0 },
            totalPoints: { type: Number, default: 0 },
        },
    },
    { timestamps: true }
)

function workingDaysValidator(val = []) {
    return val.length === 7
}

export const Store = mongoose.model('Store', storeSchema, 'stores')