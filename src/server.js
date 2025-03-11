import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import router from './routers/index.js';
import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { ctrlWrapper } from './utils/ctrlWrapper.js';

const PORT = Number(env('PORT', 3000));
const app = express();

export const startServer = () => {
  app.use(cors());

  app.use(express.json());
  app.use(cookieParser());
  app.use(router);
  app.use('*', ctrlWrapper(notFoundHandler));
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
