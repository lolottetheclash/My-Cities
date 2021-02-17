import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, message: 'User created', user });
  } catch (e) {
    res.status(404).json({ success: false, error: e });
  }
  return next();
};

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, message: 'Users list', users });
  } catch (e) {
    res.status(404).json({ success: false, error: e });
  }
};

export { createUser, getAllUsers };
