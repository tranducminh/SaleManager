import {makeExecutableSchema} from 'apollo-server'
import typeDefs from './goods.graphql'
import resolvers from '../../resolvers/goods'

export default makeExecutableSchema({
    typeDefs,
    resolvers,
})
