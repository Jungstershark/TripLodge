import express from 'express';
import { login, register, forgotPassword, resetPassword } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', (req, res, next) => {
  console.log('Login endpoint hit');
  next();
}, login);

router.post('/register', (req, res, next) => {
    console.log('Register endpoint hit');
    next();
  }, register);

router.post('/forgot-password', forgotPassword); // Add this line
router.post('/reset-password', resetPassword);

export default router;
