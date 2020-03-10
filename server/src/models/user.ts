import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import {NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import UserSchema, {UserDocument} from '../schemas/user'

UserSchema.pre<UserDocument>('save', async function(next: NextFunction) {
    // Hash the password before saving the user model
    let user = this as UserDocument
    if (user.isModified('password')) {
        user.password = await bcryptjs.hash(user.password, 8)
    }
    next()
})

UserSchema.methods.generateAuthToken = function() {
    const user = this as UserDocument
    const token = jwt.sign({userID: user._id}, (process.env.JWT_KEY as string) || 'CORONA', {
        expiresIn: 60 * 60 * 24 * 1000,
    })
    return token
}

UserSchema.methods.authenticateAdmin = function(): boolean {
    if (this.isAdmin === true) {
        return true
    }
    return false
}

UserSchema.methods.isValidPassword = function(password: string): boolean {
    return bcryptjs.compareSync(password, this.password)
}

export default mongoose.model<UserDocument>('User', UserSchema)
