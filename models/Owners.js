import mongoose from "mongoose";


const ownerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        cin: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
            required: true,
            min: 8,
            max: 8,
        },
        email: String,
        feesPercent: { type: Number, default: 0.09 },
        logoUrl: String,
        logoHash: String,
        maxEmployDelay: Number,
        pack: Number,
        verified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

export const Owner = mongoose.model('Owner', ownerSchema, 'owners')
