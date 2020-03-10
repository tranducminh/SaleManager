import UserModel from '../../models/user'

export default {
    Query: {
        authMe: async (
            _obj: any,
            obj: any,
            {isAuth, isAdmin, userID}: {isAuth: boolean; isAdmin: boolean; userID: string}
        ) => {
            if (isAuth === false) {
                return {
                    success: false,
                    message: 'User is not authenticated',
                }
            }
            let user = await UserModel.findOne({_id: userID})
            return {
                success: true,
                message: 'Success',
                data: user,
            }
        },
    },
    Mutation: {
        login: async (_obj: any, {email, password}: {email: string; password: string}) => {
            try {
                if (!email || !password) {
                    return {
                        success: false,
                        message: 'Email or password is required',
                    }
                }

                const user = await UserModel.findOne({email})
                if (!user || !user.isValidPassword(password)) {
                    return {
                        success: false,
                        message: 'Email or password is invalid',
                    }
                }

                const token = user.generateAuthToken()
                return {
                    success: true,
                    message: 'Login successfully',
                    data: token,
                }
            } catch (error) {
                return {
                    success: false,
                    message: error,
                }
            }
        },
        loginAdmin: async (_obj: any, {email, password}: {email: string; password: string}) => {
            try {
                if (!email || !password) {
                    return {
                        success: false,
                        message: 'Email or password is required',
                    }
                }

                const user = await UserModel.findOne({email})
                if (!user || !user.isValidPassword(password)) {
                    return {
                        success: false,
                        message: 'Email or password is invalid',
                    }
                }

                if (!user.isAdmin) {
                    return {
                        success: false,
                        message: 'Only admin can login',
                    }
                }

                const token = user.generateAuthToken()
                return {
                    success: true,
                    message: 'Login successfully',
                    data: token,
                }
            } catch (error) {
                return {
                    success: false,
                    message: error,
                }
            }
        },
        signup: async (
            _obj: any,
            {email, password, username, address}: {email: string; password: string; username: string; address?: string}
        ) => {
            try {
                if (!email) {
                    return {
                        success: false,
                        message: 'Email is required',
                    }
                }

                if (!username) {
                    return {
                        success: false,
                        message: 'User is required',
                    }
                }

                if (!password) {
                    return {
                        success: false,
                        message: 'Password is required',
                    }
                }

                const user = new UserModel({
                    email,
                    password,
                    username,
                    address,
                })
                await user.save()
                const token = user.generateAuthToken()
                return {
                    success: true,
                    data: token,
                    message: 'User is created successfully',
                }
            } catch (error) {
                return {
                    success: false,
                    message: error,
                }
            }
        },
    },
}
