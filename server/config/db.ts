import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;
  
  if (!mongoURI) {
    // If no URI is provided, silently assume the user is using Firebase only
    return;
  }

  try {
    await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected Sync: ${mongoose.connection.host}`);
  } catch (error: any) {
    // Silently proceed, as Firebase is the primary driver
  }
};

export default connectDB;
