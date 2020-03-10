/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
import {ApolloError} from 'apollo-server-express'
import GoodsModel from '../../models/goods'

export default {
    Query: {
        getAllGoods: async (_obj: any, obj: any, {isAuth}: {isAuth: boolean}) => {
            try {
                // console.log('user: ', auth)
                const allGoods = await GoodsModel.find({status: 'ACTIVE'})
                for (let i = 0; i < allGoods.length; i++) {
                    console.log(allGoods[i]._id)
                    allGoods[i].id = allGoods[i]._id.toString()
                }
                return allGoods
            } catch (error) {
                return new ApolloError(error)
            }
        },
    },
    Mutation: {
        getGoods: async (_obj: any, {id}: {id: string}, {isAuth}: {isAuth: boolean}) => {
            try {
                console.log(id)
                let goods = await GoodsModel.findOne({_id: id, status: 'ACTIVE'})
                console.log(goods)
                // let goods = await GoodsModel.find({_id: mongoose.Types.ObjectId(id), status: 'ACTIVE'})
                return goods
            } catch (error) {
                return new ApolloError(error)
            }
        },
        getManyGoods: async (_obj: any, {arrayID}: {arrayID: string[]}, {isAuth}: {isAuth: boolean}) => {
            try {
                // console.log('user: ', auth)
                let result = []
                console.log('aaa', arrayID[0])
                for (let item in arrayID) {
                    let id = arrayID[item]
                    console.log(id)
                    let goods = await GoodsModel.findOne({_id: id, status: 'ACTIVE'})
                    result.push({
                        id,
                        goods,
                    })
                }

                return result
            } catch (error) {
                return new ApolloError(error)
            }
        },
        createGoods: async (
            _obj: any,
            {
                name,
                quantity,
                price,
                currencyUnit,
                description,
                image,
                userID,
            }: {
                name: string
                quantity: number
                price: number
                currencyUnit: string
                description?: string
                image?: string
                userID?: string
            },
            {isAuth}: {isAuth: boolean}
        ) => {
            // if (!isAuth) return new ApolloError('authenticate is required')
            const goods = new GoodsModel({
                name,
                quantity,
                price,
                currencyUnit,
                description,
                image,
                userID,
            })

            await goods.save()
            GoodsModel.updateOne({_id: goods._id}, {$set: {id: goods._id.toString()}})
            return goods
        },
    },
}
