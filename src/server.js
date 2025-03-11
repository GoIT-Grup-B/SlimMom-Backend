import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import authRouter from './routers/auth.js';
import { initMongoDB } from './db/initMongoDB.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('✅ Server is running!');
});

export const startServer = async () => {
  try {
    await initMongoDB();
    app.listen(PORT, () =>
      console.log(`🚀 Server is running on http://localhost:${PORT}`),
    );
  } catch (error) {
    console.error('❌ Server startup failed:', error);
  }
};
