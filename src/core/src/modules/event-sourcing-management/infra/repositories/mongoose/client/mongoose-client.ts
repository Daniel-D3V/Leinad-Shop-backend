import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!, );
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;