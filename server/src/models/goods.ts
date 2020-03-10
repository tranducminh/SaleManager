import mongoose from 'mongoose'
import GoodsSchema, {GoodsDocument} from '../schemas/goods'

export default mongoose.model<GoodsDocument>('Goods', GoodsSchema)
