import express, { Router } from 'express';
import { userController } from './user.controller';
const router: Router = express.Router();

router.post('/', userController.createUser)
router.get('/', userController.getAllUser)
router.get('/:id', userController.getSingleUser)

export const userRoute = router;