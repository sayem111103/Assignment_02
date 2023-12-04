import { Request, Response } from 'express'
import { userServices } from './user.service'
import {
  UserOrderValidationSchema,
  UserUpdateValidationSchema,
  UserValidationSchema,
} from './user.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const validateUser = UserValidationSchema.parse(user)
    const result = await userServices.createUserIntoDB(validateUser)
    res.status(200).send({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'something went wrong',
      error: {
        code: 404,
        description: error,
      },
    })
  }
}

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserFromDB()
    res.status(200).send({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'something went wrong',
      error: {
        code: 404,
        description: error,
      },
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await userServices.getSingleUserFromDB(id)
    res.status(200).send({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'something went wrong',
      error: {
        code: 404,
        description: error,
      },
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const user = req.body
    const validateUser = UserUpdateValidationSchema.parse(user)
    const result = await userServices.updateUserInDB(id, validateUser)
    res.status(200).send({
      success: true,
      message: 'User Updated successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'something went wrong',
      error: {
        code: 404,
        description: error,
      },
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const result = await userServices.deleteUserInDB(id)
    res.status(200).send({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'something went wrong',
      error: {
        code: 404,
        description: error,
      },
    })
  }
}

const createOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId
    const order = req.body
    const validateOrder = UserOrderValidationSchema.parse(order)
    const result = await userServices.createOrderIntoDB(id, validateOrder)
    res.status(200).send({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'something went wrong',
      error: {
        code: 404,
        description: error,
      },
    })
  }
}

const getOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId
    const result = await userServices.getOrderFromDB(id)
    res.status(200).send({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'something went wrong',
      error: {
        code: 404,
        description: error,
      },
    })
  }
}

const getOrderTotalPrice = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId
    const result = await userServices.getOrderTotalPriceFromDB(id)
    res.status(200).send({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message || 'something went wrong',
      error: {
        code: 404,
        description: error,
      },
    })
  }
}

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  createOrder,
  getOrder,
  getOrderTotalPrice
}
