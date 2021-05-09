import express from 'express';
import {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  authUser,
} from '../controllers/users';

const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getSingleUser);
userRouter.post('/', createUser);
userRouter.post('/auth', authUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
