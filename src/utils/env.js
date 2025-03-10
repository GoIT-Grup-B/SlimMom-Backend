import dotenv from 'dotenv';

dotenv.config();

const ENV = {
  MONGODB_URL: process.env.MONGODB_URL,
  PORT: process.env.PORT || 5000,
};

export default ENV;
