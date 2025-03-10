import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(" MongoDB'ye başarıyla bağlandı!");
  } catch (error) {
    console.error(' MongoDB bağlantı hatası:', error.message);
    process.exit(1);
  }
};

export default connectDB;
