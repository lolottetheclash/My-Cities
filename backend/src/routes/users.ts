import express from 'express';
import { createUser, getAllUsers, getSingleUser } from '../controllers/users';

const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getSingleUser);

export default userRouter;
