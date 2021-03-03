import mongoose, { Types } from 'mongoose';
import { IUser } from './User';

type ID = Types.ObjectId;

export interface ITravel extends mongoose.Document {
  title: string;
  city: string;
  description: string;
  pictures?: string[];
  author: IUser['_id'];
}

const TravelSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  pictures: { type: [String] },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
});

export default mongoose.model<ITravel>('Travel', TravelSchema);
