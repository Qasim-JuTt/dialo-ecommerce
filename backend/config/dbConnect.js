import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI); // no tls options
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to DB: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;
