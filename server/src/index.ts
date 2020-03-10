import {ApolloServer} from 'apollo-server'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import schema from './graphql'
import {auth} from './middlewares/user'

const server = new ApolloServer({
    schema,
    context: async ({req}) => {
        // simple auth check on every request
        const token = req.headers.authorization || ''
        // if (!auth) throw new ApolloError('Tolen is required')
        let result = await auth(token)
        // console.log(...auth(token))

        return {
            isAuth: result.isAuth,
            userID: result.userID,
            isAdmin: result.isAdmin,
        }
        // const email = Buffer.from(auth, 'base64').toString('ascii')
        // if (!isEmail.validate(email)) return {user: null}
        // // find a user by their email
        // const users = await store.users.findOrCreate({where: {email}})
        // const user = (users && users[0]) || null
        // return {user: {...user.dataValues}}
    },
    dataSources: () => ({}),
})

dotenv.config()
const {DB_USERNAME, DB_PASSWORD, DB_NAME} = process.env

const MONGODB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0-oajkt.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('Database connected ...'))
    .catch((error) => console.log('Could not connect to database ...', error.message))

server.listen().then(({url}: {url: string}) => {
    console.log(`🚀 Server ready at ${url}`)
})
