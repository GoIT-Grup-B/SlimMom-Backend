import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import myProductsRouter from './routers/myProductsRouter.js';

dotenv.config();

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.use('/api/myproducts', myProductsRouter);

  const PORT = process.env.PORT || 3000;

  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log(" MongoDB'ye başarıyla bağlandı.");
      app.listen(PORT, () =>
        console.log(` Server ${PORT} portunda çalışıyor.`),
      );
    })
    .catch((error) => console.error(' MongoDB bağlantı hatası:', error));
};
