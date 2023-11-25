import { User } from '../user.model'
import { TUser } from './user.interface'

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
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  )
  return result
}

const getSingleUserFromDB = async (id: string) => {
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
const updateUserInDB = async (id: string, data: any) => {
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

const deleteUserInDB = async (id: string) => {
  if (await User.isUserExists(id)) {
    const query = { userId: id }
    const result = await User.updateOne(query, { isDeleted: true })
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
}
