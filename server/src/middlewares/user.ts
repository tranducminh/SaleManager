import jwt from 'jsonwebtoken'
import User from '../models/user'

export const auth = async (token: string) => {
    if (!token) {
        return {
            isAuth: false,
        }
    }
    // eslint-disable-next-line no-param-reassign
    // token = token.replace(/Bearer /g, '')
    const {JWT_KEY} = process.env
    const decoded = jwt.verify(token, JWT_KEY as string)
    const {userID} = decoded as {userID?: string}
    const user = await User.findOne({_id: userID})
    if (!user) {
        return {
            isAuth: false,
        }
    }

    return {
        isAuth: true,
        userID,
        isAdmin: user.isAdmin,
    }
}
