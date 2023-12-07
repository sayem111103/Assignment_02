import { z } from 'zod'

const UserNameValidationSchema = z.object({
  firstName: z.string({ required_error: 'First name is required' }),
  lastName: z.string({ required_error: 'Last name is required' }),
})

const UserAddressValidationSchema = z.object({
  street: z.string({ required_error: 'Street is required' }),
  city: z.string({ required_error: 'City is required' }),
  country: z.string({ required_error: 'Country is required' }),
})

export const UserOrderValidationSchema = z.object({
  productName: z.string({ required_error: 'Product name is required' }),
  price: z.number({ required_error: 'Price is required' }),
  quantity: z.number({ required_error: 'Quantity is required' }),
})

export const UserValidationSchema = z.object({
  userId: z.number({ required_error: 'User ID is required' }),
  username: z.string({ required_error: 'Username is required' }),
  password: z.string({ required_error: 'Password is required' }),
  fullName: UserNameValidationSchema,
  age: z.number({ required_error: 'Age is required' }),
  email: z.string({ required_error: 'Email is required' }).email(),
  isActive: z.boolean({ required_error: 'isActive is required' }),
  hobbies: z.array(z.string({ required_error: 'Hobbies are required' })),
  address: UserAddressValidationSchema,
  orders: z.array(UserOrderValidationSchema).optional(),
  isDeleted: z.boolean().default(false),
})

const UserNameUpdateValidationSchema = z.object({
  firstName: z.optional(z.string()),
  lastName: z.optional(z.string()),
})

const UserAddressUpdateValidationSchema = z.object({
  street: z.optional(z.string()),
  city: z.optional(z.string()),
  country: z.optional(z.string()),
})

const UserOrderUpdateValidationSchema = z.object({
  productName: z.optional(z.string()),
  price: z.optional(z.number()),
  quantity: z.optional(z.number()),
})

export const UserUpdateValidationSchema = z.object({
  userId: z.number().optional(),
  username: z.optional(z.string()),
  password: z.optional(z.string()),
  fullName: z.optional(UserNameUpdateValidationSchema),
  age: z.optional(z.number()),
  email: z.optional(z.string().email()),
  isActive: z.optional(z.boolean()),
  hobbies: z.optional(z.array(z.string())),
  address: z.optional(UserAddressUpdateValidationSchema),
  orders: z.optional(z.array(UserOrderUpdateValidationSchema)),
  isDeleted: z.optional(z.boolean()),
})
