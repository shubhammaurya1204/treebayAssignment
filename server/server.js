import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import formRouter from "./routes/formRoutes.js";
import User from "./models/User.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;

/* -------------------- Middleware -------------------- */

// Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// app.options("*", cors());
// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

/* -------------------- Routes -------------------- */

app.use("/api/users", userRouter);
app.use("/api/forms", formRouter);

/* -------------------- 404 Handler -------------------- */

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* -------------------- Start Server -------------------- */

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");

    // Seed Admin User
    const adminExists = await User.findOne({ email: "admin@gmail.com" });
    if (!adminExists) {
      await User.create({
        name: "Admin",
        email: "admin@gmail.com",
        password: "12345",
        isAdmin: true
      });
      console.log("Admin user seeded successfully");
    } else if (!adminExists.isAdmin) {
      adminExists.isAdmin = true;
      await adminExists.save();
      console.log("Admin user permissions updated");
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();