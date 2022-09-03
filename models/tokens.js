import mongoose from 'mongoose'

const tokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true
        },
        ip: { type: String }

    }, { timestamps: true }
)

tokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 1696000 }) // will expire in 15 day

export const Token = mongoose.model('Token', tokenSchema)