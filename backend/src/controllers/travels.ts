import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../utils/errorResponse';
import Travel from '../models/Travel';
import User from '../models/User';

import asyncHandler from '../middlewares/async';

const getAllTravels = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const travels = await Travel.find();
    res.status(200).json({
      success: true,
      travelsCount: travels.length,
      message: 'Travels list',
      travels,
    });
  }
);

const getSingleTravel = asyncHandler(
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | ErrorResponse> => {
    const travel = await Travel.findById(req.params.id);
    if (!travel) {
      next(
        new ErrorResponse(`Travel not found with id of ${req.params.id}`, 404)
      );
    } else {
      res.status(200).json({ success: true, travel });
    }
  }
);

const createTravel = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const travel = await Travel.create(req.body);
    // Chercher l'id dans le futur cookie ou le local storage et non ds le body!
    // Add created travel to user's travels list
    const userTravelsUpdated = await User.findByIdAndUpdate(
      req.body.author,
      {
        $push: { travels: travel._id },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!userTravelsUpdated) {
      next(
        new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
      );
    } else {
      res
        .status(201)
        .json({ success: true, message: 'Travel created', travel });
    }
  }
);

const updateTravel = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const travel = await Travel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!travel) {
      next(
        new ErrorResponse(`Travel not found with id of ${req.params.id}`, 404)
      );
    } else {
      res
        .status(200)
        .json({ success: true, message: 'Travel updated', travel });
    }
  }
);

const deleteTravel = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const travel = await Travel.findByIdAndDelete(req.params.id);
    if (!travel) {
      next(
        new ErrorResponse(`Travel not found with id of ${req.params.id}`, 404)
      );
    } else {
      // Chercher l'id dans le futur cookie ou le local storage et non ds le body!
      // Remove deleted travel to user's travels list
      await User.findByIdAndUpdate(
        req.body.author,
        {
          $pull: { travels: travel._id },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({ success: true, message: 'Travel deleted' });
    }
  }
);

export {
  createTravel,
  getAllTravels,
  getSingleTravel,
  updateTravel,
  deleteTravel,
};
