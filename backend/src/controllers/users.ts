import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import ErrorResponse from '../utils/errorResponse';
import User from '../models/User';
import asyncHandler from '../middlewares/async';
import Travel from '../models/Travel';

const getAllUsers = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
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
      next(
        new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      );
    } else {
      res.status(200).json({ success: true, user });
    }
  }
);

const createUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.body) return;
    const user = await User.create(req.body);
    res.status(201).json({ success: true, message: 'User created', user });
  }
);

const authUser = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | ErrorResponse> => {
    // TODOOOOOOOOOO : Voir pr factoriser, pt on enlever les if else?
    if (!req.body) return;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      next(new ErrorResponse(`User not found`, 404));
    } else {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) {
        next(new ErrorResponse(`Invalid Password`, 401));
      } else {
        const userSessionToken = jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET as string
        );
        
        res.status(200).json({ success: true, message: 'User logged', user, userSessionToken });
      }
    }
  }
);

const updateUser = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | ErrorResponse> => {
    // TODOOOOOOOOOO : Mongoose middleware is not invoked on update() operations, so you must use a save() if you want to update user passwords.
    // si on ft pas le save au lieu du update, a priori cela ne re hashera pas le password: à vérifier
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      next(
        new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      );
    } else {
      res.status(200).json({ success: true, message: 'User updated', user });
    }
  }
);

const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      next(
        new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      );
    } else {
      // Delete all user's associated travels
      if (user.travels?.length) {
        user.travels.map(async (travelId) => {
          await Travel.findByIdAndDelete(travelId);
        });
      }
      res.status(200).json({ success: true, message: 'User deleted' });
    }
  }
);

const logOut = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | ErrorResponse> => {
    const user = await User.findById(req.body.id);
    if (!user) {
      next(
        new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      );
    } else {
      res.clearCookie('token');
      res.clearCookie('sessionId');
      user.save();
      res.status(200).json({ success: true });
    }
  }
);

export {
  createUser,
  authUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  logOut,
};
