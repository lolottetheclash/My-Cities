import colors from 'colors';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import * as dotenv from 'dotenv';
import mongodbStart from './database/db';

import userRouter from './routes/users';
import travelRouter from './routes/travels';

import errorHandler from './middlewares/error';

colors.enable();
const app = express();

// Loading environment variables
dotenv.config();

// Connection to DB
mongodbStart();

// Allow Cross Origin
app.use(cors());

// Allow to parse cookies
app.use(cookieParser());

// Parse URL
app.use(express.json());

// Users & Travels Routes
app.use('/api/users', userRouter);
app.use('/api/travels', travelRouter);

// Error Handler
app.use(errorHandler);

// Express server launch
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${process.env.PORT} !`.green.bold);
});

// Handling Rejected Promise
process.on('uncaughtException', (err: Error) => {
  console.log(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});
