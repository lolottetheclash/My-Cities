import { Request, Response, NextFunction } from 'express';

type CallBack = (req: Request, res: Response, next: NextFunction) => void;

const asyncHandler = (fn: CallBack) => (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
