import express, { Router } from 'express';
import { userController } from './user.controller';
const router: Router = express.Router();

router.post('/', userController.createUser)
router.get('/', userController.getAllUser)
router.get('/:id', userController.getSingleUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)
router.put('/:userId/orders', userController.createOrder)

export const userRoute = router;