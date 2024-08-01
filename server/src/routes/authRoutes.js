import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', (req, res, next) => {
  console.log('Login endpoint hit');
  next();
}, login);

export default router;
