import colors from 'colors';
import express from 'express';
import * as dotenv from 'dotenv';
import mongodbStart from './database/db';

import userRouter from './routes/users';

colors.enable();
const app = express();

// Loading environment variables
dotenv.config();

// Connection to DB
mongodbStart();

// Parse URL
app.use(express.json());

// Routes
app.use('/api/users', userRouter);

// Express server launch
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${process.env.PORT} !`.green.bold);
});
