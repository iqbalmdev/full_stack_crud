import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.name}`);
  } catch (error) {
    console.error(`MongoDB connection error:`, error);
    process.exit(1);
  }
};

export default connectDB;
