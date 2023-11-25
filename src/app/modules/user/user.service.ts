import { User } from '../user.model'
import { TUser } from './user.interface'

const createUserIntoDB = async (data: TUser) => {
  if (await User.isUserExists(data.userId)) {
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
  const result = await User.findOne(
    { userId: id },
    { password: 0, isDeleted: 0 },
  )
  return result
}
export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
}
