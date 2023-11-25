import { Request, Response } from 'express'
import { userServices } from './user.service'
import { UserValidationSchema } from './user.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
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
      message: 'something went wrong',
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
      message: 'something went wrong',
      error: {
        code: 404,
        description: error,
      },
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
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
      message: 'something went wrong',
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
  getSingleUser
}
