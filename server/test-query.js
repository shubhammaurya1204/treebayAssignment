import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

console.log("Connecting to:", process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log('Connected. Running test query...');
    try {
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log('Collections:', collections.map(c => c.name));
      console.log('Query successful');
      process.exit(0);
    } catch (err) {
      console.error('Query Error:', err.message);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Connection Error:', err.message);
    process.exit(1);
  });
