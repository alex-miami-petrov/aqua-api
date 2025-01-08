import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_URI = process.env.MONGODB_URI;

console.log('Loaded MongoDB URI:', process.env.MONGODB_URI);

const initMongoConnection = async () => {
  const DB_URI = process.env.MONGODB_URI;
  try {
    await mongoose.connect(DB_URI);
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

export default initMongoConnection;
