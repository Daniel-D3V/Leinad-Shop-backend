import mongoose from 'mongoose';

export const connectMongoDB = async (showLogs: boolean = false): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!, );
    if(showLogs) console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};
