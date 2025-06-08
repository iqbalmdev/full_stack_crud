import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { json } from 'body-parser';
import postRoutes from './routes/postRoutes';
import { errorHandler } from './middlewares/errorHandler';
import connectDB from './config/connectDB';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use('/api/posts', postRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4002;
const startServer = async () => {
  console.log("connecting to db")
  await connectDB(); // connect to MongoDB

  app.listen(PORT, () => {
    console.log(`Auth service running on port ${PORT}`);
  });
};

startServer();