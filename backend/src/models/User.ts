import mongoose from 'mongoose';
import { ITravel } from './Travel';

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  travels?: ITravel['_id'][];
}

const UserSchema = new mongoose.Schema<IUser>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, trim: true },
  travels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Travel',
    },
  ],
});

export default mongoose.model<IUser>('User', UserSchema);
