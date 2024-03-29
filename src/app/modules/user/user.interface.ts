import { Model } from "mongoose"

export type TuserName = {
  firstName: string
  lastName: string
}
export type TuserAddress = {
  street: string
  city: string
  country: string
}

export type TuserOrder = {
  productName: string
  price: number
  quantity: number
}

export type TUser = {
  userId: number
  username: string
  password: string
  fullName: TuserName
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: TuserAddress
  orders?: TuserOrder[]
  isDeleted: boolean
}

export interface UserModel extends Model<TUser> {
  isUserExists(id: number): Promise<TUser | null>
}
