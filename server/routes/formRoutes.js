import express from "express"
import Form from "../models/Form.js"
const fromRouter = express.Router();

// Submit form
fromRouter.post('/submit', async (req, res) => {
  const { name, email, phone, address, message } = req.body;
  try {
    const newForm = new Form({ name, email, phone, address, message });
    await newForm.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all form submissions
fromRouter.get('/all', async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.status(200).json(forms);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default fromRouter;