import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
    {
        ///_id: { type: mongoose.Types.ObjectId, required: true },
        name: {
            type: String,
            require: true,
        },
        sellingByPiece: {
            type: Boolean,
            require: true,
        },
        category: {
            type: Number,
            required: true,
        },
        weight: {
            type: Number,
            require: true,
        },
        price: {
            type: Number,
            required: true,
        },
        sellerId: {
            type: String,
            required: true,
        },
        badges: { type: Array },
        ingredients: String,
        schedules: { type: Array },
        available: Boolean,
        imageUrl: {
            type: String,
            required: true,
        },
        imageHash: String,
    },
    { timestamps: true }
)

ProductSchema.index({ makerId: 1 })

export const Product = mongoose.model('Product', ProductSchema, 'products')