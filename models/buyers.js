import mongoose from 'mongoose'



const buyerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 3,
            max: 20,
        },
        points: {
            type: Number,
            default: 0,
        },
        resetCode: {
            code: {
                type: String,
            },
            time: {
                type: Date,
            },
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
            required: true,
            min: 8,
            max: 8,
        },
        code: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            min: 4,
            required: true,
            max: 30,
        },
        timeRange: {
            type: Number,
            default: 10,
        },
        favoriteProducts: {
            type: Array,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        stores: {
            type: [

                {
                    storeId: String,
                    balance: {type: mongoose.Schema.Types.Decimal128, min: 0},
                    sellerName: String,
                    ratings: Number,
                },
            ],
            default: [],
        },
    },
    {timestamps: true}
)


export const Buyer = mongoose.model('Buyer', buyerSchema, 'buyers')