import mongoose from 'mongoose'
import Decimal from 'decimal.js'

Decimal.set({ precision: 3 })

const transactionScheme = new mongoose.Schema(
    {
        sender: String,
        receiver: String,
        fee: {
            type: mongoose.Schema.Types.Decimal128,
            default: '0.0',
        },
        amount: {
            type: mongoose.Schema.Types.Decimal128,
            default: '0.0',
        },
        type: Number,
        description: String,
    },
    {
        timestamps: true,
    }
)

transactionScheme.methods.toJSON = function () {
    const attrs = this.toObject()
    return {
        sender: attrs.sender.toString(),
        receiver: attrs.receiver.toString(),
        fee: attrs.fee.toString(),
        amount: attrs.amount,
        createdAt: attrs.createdAt,
    }
}

transactionScheme.statics.sendTo = async function (
    sender,
    receiver,
    amountStr,
    type,
    description
) {
    let amount

    try {
        amount = Decimal(amountStr)
    } catch (e) {
        return Promise.reject(new Error({ message: 'amount is not a number' }))
    }

    return await new Transaction({
        sender,
        receiver,
        amount,
        type,
        description,
    }).save()
}

export const Transaction = mongoose.model('Transaction', transactionScheme)