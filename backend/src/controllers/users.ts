import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../utils/errorResponse';
import User from '../models/User';
import asyncHandler from '../middlewares/async';

const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const users = await User.find();
    res.status(200).json({
      success: true,
      usersCount: users.length,
      message: 'Users list',
      users,
    });
  }
);

const getSingleUser = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | ErrorResponse> => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(
        new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, user });
  }
);

const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, message: 'User created', user });
  }
);

const updateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return next(
        new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, message: 'User updated', user });
  }
);

const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(
        new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, message: 'User deleted' });
  }
);
export { createUser, getAllUsers, getSingleUser, updateUser, deleteUser };
