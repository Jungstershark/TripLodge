import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { insertCustomer, findUserByEmail } from '../models/customer.js';

dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid username or password');
      return res.status(400).json({ success: false, message: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.customerId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful');
    res.status(200).json({ success: true, token, userId: user.customerId, username: user.username });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const register = async (req, res) => {
  const { email, password, username, hp } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      customerId: null, // Assume customerId is auto-incremented in the database
      username,
      email,
      password: hashedPassword,
      hp
    };

    await insertCustomer(newUser);
    const token = jwt.sign({ userId: newUser.customerId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ success: true, token, userId: newUser.customerId, username: newUser.username });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
