import {mergeSchemas} from 'apollo-server'
import user from './graphqlSchemas/user'
import goods from './graphqlSchemas/goods'

export default mergeSchemas({
    schemas: [goods, user],
})
