import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

// Loading environment variables
dotenv.config();

const mongoUri = process.env.MONGO_URI;

// Connection to MongoDB
const mongodbStart = async (): Promise<void> => {
  try {
    await mongoose.connect(`${mongoUri}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      autoIndex: true,
    });
    console.log('MongoDB is connected'.cyan.bold);
  } catch (err) {
    console.error(
      `An error occurred during MongoDB connection : ${err}`.red.bold
    );
  }
};

export default mongodbStart;
