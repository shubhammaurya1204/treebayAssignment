import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import fs from "fs";

const userRouter = express.Router();

function logTrace(msg) {
  fs.appendFileSync('trace.txt', msg + '\n');
}

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: "30d",
  });
};

// Check if user exists
userRouter.post('/check', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json({ exists: true });
    }
    res.status(200).json({ exists: false });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Sign up user
userRouter.post('/signup', async (req, res) => {
  logTrace("1. Entered signup route");
  const { name, email, password } = req.body;
  try {
    logTrace("2. Finding user...");
    const userExists = await User.findOne({ email });
    logTrace("3. Found user: " + (userExists ? "yes" : "no"));
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    logTrace("4. Creating user...");
    const user = await User.create({ name, email, password });
    logTrace("5. User created");
    if (user) {
      res.cookie("jwt", generateToken(user._id), {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        message: 'User created successfully'
      });
      logTrace("6. Response sent");
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (err) {
    console.error(err);
    logTrace("ERROR: " + err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login user
userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.cookie("jwt", generateToken(user._id), {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        message: 'User logged in successfully'
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout user
userRouter.post('/logout', (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

export default userRouter;