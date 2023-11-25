import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import {
  TUser,
  TuserAddress,
  TuserName,
  TuserOrder,
  UserModel,
} from './user/user.interface'
import { config } from '../config/config'

const userNameSchema = new Schema<TuserName>({
  firstName: { type: String, required: [true, 'First Name is Required'] },
  lastName: { type: String, required: [true, 'Last Name is Required'] },
})

const userAddressSchema = new Schema<TuserAddress>({
  street: { type: String, required: [true, 'Street Name is Required'] },
  city: { type: String, required: [true, 'City Name is Required'] },
  country: { type: String, required: [true, 'Country Name is Required'] },
})

const TuserOrderSchema = new Schema<TuserOrder>({
  productName: { type: String, required: [true, 'Product Name is Required'] },
  price: { type: Number, required: [true, 'Price is Required'] },
  quantity: { type: Number, required: [true, 'Quantity is Required'] },
})

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: String,
    required: [true, 'User Id is Required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is Required'],
    unique: true,
  },
  password: { type: String, required: [true, 'Password is Required'] },
  fullName: userNameSchema,
  age: { type: Number, required: [true, 'Age is Required'] },
  email: { type: String, required: [true, 'Email is Required'], unique: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: [String], required: [true, 'Hobbies are Required'] },
  address: userAddressSchema,
  orders: [TuserOrderSchema],
  isDeleted: { type: Boolean, required: true, default: false },
})

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  )
  next()
})

userSchema.post('save', function (doc, next) {
  doc.set('password', undefined)
  next()
})


userSchema.statics.isUserExists = async function (userId: string) {
  const existingUser = await User.findOne({ userId })
  return existingUser
}
export const User = model<TUser, UserModel>('User', userSchema)
