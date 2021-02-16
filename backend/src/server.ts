import express from 'express';
import * as dotenv from 'dotenv';
import mongodbStart from './database/db';

const app = express();

// Loading environment variables
dotenv.config();

// Connection to DB
mongodbStart();

// Express server launch
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${process.env.PORT} !`);
});
