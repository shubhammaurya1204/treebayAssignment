import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log(`DATABASE CONNECTED!! Host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`DATABASE CONNECTION ERROR!! ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;