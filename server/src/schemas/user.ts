import {Schema, Document} from 'mongoose'

export interface UserDocument extends Document {
    username: string
    email: string
    address: string
    password: string
    isAdmin: boolean
    isValidPassword: (password: string) => boolean
    generateAuthToken: () => string
}

const UserSchema: Schema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {timestamps: true, versionKey: false}
)

export default UserSchema
