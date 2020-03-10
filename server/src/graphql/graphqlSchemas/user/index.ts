import {makeExecutableSchema} from 'apollo-server'
import typeDefs from './user.graphql'
import resolvers from '../../resolvers/user'

export default makeExecutableSchema({
    typeDefs,
    resolvers,
})
