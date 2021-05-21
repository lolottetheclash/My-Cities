import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
// eslint-disable-next-line import/no-cycle
import { ITravel } from './Travel';

export interface IUser extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  sessionUuid?: string | null;
  travels?: ITravel['_id'][];
}

const UserSchema = new mongoose.Schema<IUser>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, trim: true },
  sessionUuid: { type: String },
  travels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Travel',
    },
  ],
});

const saltRounds = 10;

UserSchema.pre('save', function (next) {
  const user = (this as unknown) as IUser;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) next();
  // generate a salt
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) next(err);
    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, function (error, hash) {
      if (error) next(error);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

export default mongoose.model<IUser>('User', UserSchema);
