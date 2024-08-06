import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { findUserByEmail, updateUser, insertCustomer, findUserByToken } from '../models/customer.js';

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
      res.status(200).json({ success: true, token, userId: user.customerId });
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
    customerId: null,  // Assume customerId is auto-incremented in the database
    username,
    email,
    password: hashedPassword,
    hp
    };

    await insertCustomer(newUser);
    const token = jwt.sign({ userId: newUser.customerId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ success: true, token, userId: newUser.customerId });
} catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
}
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PW,
  },
});

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Email not found' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await updateUser(user.customerId, {
      resetPasswordToken: resetToken,
      resetPasswordExpires,
    });

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    const mailOptions = {
      from: 'Ascenda Hotel Booking <no-reply@ascenda.com>',
      to: [user.email],
      subject: 'Password Reset Request',
      text: `
        Dear ${user.username},

        You are receiving this because you (or someone else) have requested the reset of the password for your account.
        Please click on the following link, or paste this into your browser to complete the process:
        
        ${resetUrl}
        
        If you did not request this, please ignore this email and your password will remain unchanged.
        
        Best regards,
        Ascenda Project Team C4G1
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const user = await findUserByToken(token);
    if (!user || user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ success: false, message: 'Token is invalid or has expired' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const updates = {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    };
    await updateUser(user.customerId, updates);

    res.status(200).json({ success: true, message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
