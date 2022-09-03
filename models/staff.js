import mongoose from 'mongoose'

const staffSchema = new mongoose.Schema(
    {
        imageUrl: String,
        imageHash: String,
        name: String,
        department: String
    }, { timestamps: true }
)

export const Staff = mongoose.model('Staff', staffSchema, 'staffs')