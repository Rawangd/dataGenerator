import mongoose from 'mongoose'
import fs from 'fs'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import https from 'https'
import moment from 'moment'


const employeeSchema = new mongoose.Schema(
    {
        name: String,
        photoUrl: String,
        empSchedule: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EmpSchedule',
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 30,
        },
        resetCode: {
            code: {
                type: String,
            },
            time: {
                type: Date,
            },
        },
        phone: String,
        role: {type: Number, default: 2},
        position: String,
        grade: String,
        salary: Number,
        verified: Boolean,
        advances: [Number],
        points: {type: Number, default: 0},
        isActive: {type: Boolean, default: false},
        storeId: mongoose.Schema.Types.ObjectId,
    },
    {timestamps: true}
)

employeeSchema.pre('save', async function (next) {
    try {
        if (this.password.length === 4) {
            const hashedPassword = await bcrypt.hash(this.password, 12)
            this.password = hashedPassword
        }
    } catch (error) {
        console.error(error)
    }
    return next()
})
export const Employee = mongoose.model('Employee', employeeSchema, 'employees')