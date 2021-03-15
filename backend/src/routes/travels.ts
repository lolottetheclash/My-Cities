import express from 'express';
import {
  createTravel,
  getAllTravels,
  getSingleTravel,
  updateTravel,
  deleteTravel,
} from '../controllers/travels';

const travelRouter = express.Router();

travelRouter.get('/', getAllTravels);
travelRouter.get('/:id', getSingleTravel);
travelRouter.post('/', createTravel);
travelRouter.put('/:id', updateTravel);
travelRouter.delete('/:id', deleteTravel);

export default travelRouter;
