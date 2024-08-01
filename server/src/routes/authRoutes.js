import express from 'express';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', (req, res, next) => {
  console.log('Login endpoint hit');
  next();
}, login);

router.post('/register', (req, res, next) => {
    console.log('Register endpoint hit');
    next();
  }, register);

export default router;
