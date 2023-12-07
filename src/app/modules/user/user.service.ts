import { User } from '../user.model'
import { TUser, TuserOrder } from './user.interface'

const createUserIntoDB = async (data: TUser) => {
  if (await User.isUserExists(data?.userId)) {
    throw new Error('User already exists!')
  }
  const result = await User.create(data)
  return result
}

const getAllUserFromDB = async () => {
  const result = await User.find(
    {},
    {
      password: 0, isDeleted: 0, _id: 0
    },
  )
  return result
}

const getSingleUserFromDB = async (id: number) => {
  if (await User.isUserExists(id)) {
    const result = await User.findOne(
      { userId: id },
      { password: 0, isDeleted: 0 },
    )
    return result
  }
  throw new Error('User Not Exist!')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateUserInDB = async (id: number, data: any) => {
  if (await User.isUserExists(id)) {
    const query = { userId: id }
    const update = {
      $set: data,
    }
    const result = await User.updateOne(query, update)
    if (result.modifiedCount) {
      const find = await User.findOne(
        { userId: id },
        { password: 0, isDeleted: 0 },
      )
      return find
    }
  }
  throw new Error('User Not Exist!')
}

const deleteUserInDB = async (id: number) => {
  if (await User.isUserExists(id)) {
    const query = { userId: id }
    const result = await User.updateOne(query, { isDeleted: true })
    return result
  }
  throw new Error('User Not Exist!')
}

const createOrderIntoDB = async (id: number, data: TuserOrder) => {
  if (await User.isUserExists(id)) {
    const query = { userId: id }
    const result = await User.updateOne(query, { $push: { orders: data } })
    return result
  }
  throw new Error('User Not Exist!')
}

const getOrderFromDB = async (id: number) => {
  if (await User.isUserExists(id)) {
    const result = await User.findOne({ userId: id }, { orders: 1 })
    return result
  }
  throw new Error('User Not Exist!')
}

const getOrderTotalPriceFromDB = async (id: number) => {
  if (await User.isUserExists(id)) {
    const result = await User.aggregate([
      { $match: { userId: id } },
      {
        $project: {
          totalPrice: {
            $sum: {
              $map: {
                input: '$orders',
                as: 'totalOrder',
                in: {
                  $multiply: ['$$totalOrder.price', '$$totalOrder.quantity'],
                },
              },
            },
          },
        },
      },
    ])
    return result
  }
  throw new Error('User Not Exist!')
}

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserInDB,
  createOrderIntoDB,
  getOrderFromDB,
  getOrderTotalPriceFromDB,
}
