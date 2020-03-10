import {Schema, Document} from 'mongoose'

export interface GoodsDocument extends Document {
    id: string
    name: string
    quantity: number
    price: number
    currencyUnit: string
    description?: string
    status: string
    image?: string
    userID: string
}

const GoodsSchema: Schema = new Schema(
    {
        id: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        currencyUnit: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            required: true,
            enum: ['DISABLE', 'ACTIVE'],
            default: 'ACTIVE',
        },
        image: {
            type: String,
            required: false,
        },
        userID: {
            type: String,
            ref: 'User',
            required: true,
        },
    },
    {timestamps: true}
)

export default GoodsSchema
