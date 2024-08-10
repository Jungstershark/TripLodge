import request from 'supertest';
import express from 'express';
import authRouter from '../../src/routes/authRoutes.js';
import { findUserByEmail, insertCustomer, updateUser, findUserByToken } from '../../src/models/customer.js';
import { resetPassword } from '../../src/controllers/authController.js';
import exp from 'constants';

// Mock the findUserByEmail function
jest.mock('../../src/models/customer.js', () => ({
  findUserByEmail: jest.fn(),
  insertCustomer: jest.fn(),
  updateUser: jest.fn(),
  findUserByToken: jest.fn(),
}));

jest.mock('nodemailer', () => ({
    createTransport: jest.fn().mockReturnValue({
      sendMail: jest.fn().mockResolvedValue(true),
    }),
}));

const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);

describe('Auth Integration Tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // for login function
  it('(Login) should return 404 if user not found', async () => {
    findUserByEmail.mockResolvedValue(null);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nonexistent@example.com', password: 'Password@123' });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'User not found');
  });

  it('(Login) should return 400 if the password is incorrect', async() => {
    findUserByEmail.mockResolvedValue({
        customerId: 4,
        username: 'testuser',
        email: '50.003.c4g1@gmail.com',
        password: '$2a$10$2Dwyy1XtOFfGADjmnUiXIePL5lmw9S1NM7itpripzgVj1CncS5LR6',
        hp: '12345678',
        resetPasswordToken: null,
        resetPasswordExpires: null})

    const bcrypt = require('bcryptjs');
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

    const res = await request(app)
        .post('/api/auth/login')
        .send({email:'50.003.c4g1@gmail.com', password: 'wrongpassword'});
    
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'Invalid username or password');
    });

  it('(Login) should return 200 if login is successful', async () => {
    findUserByEmail.mockResolvedValue({
        customerId: 4,
        username: 'testuser',
        email: '50.003.c4g1@gmail.com',
        password: '$2a$10$2Dwyy1XtOFfGADjmnUiXIePL5lmw9S1NM7itpripzgVj1CncS5LR6',
        hp: '12345678',
        resetPasswordToken: null,
        resetPasswordExpires: null})
    
    const bcrypt = require('bcryptjs');
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

    const jwt = require('jsonwebtoken');
    jest.spyOn(jwt, 'sign').mockReturnValue('fake-jwt-token');

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'Password@12345'});
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('token', 'fake-jwt-token');
    expect(res.body).toHaveProperty('userId', 4);
    expect(res.body).toHaveProperty('username', 'testuser');
  });

  it('(Login) should return 500 if an error occurs with the server during login', async() =>{
    findUserByEmail.mockImplementation(() => {
        throw new Error('Database query failed');
    });

    const res = await request(app)
        .post('/api/auth/login')
        .send({email: 'test@example.com', password: 'Password@12345'});
    
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'Server error');
  });
  
  // for register function
  it ('(Register) should return 400 if user already exists', async () => {
    findUserByEmail.mockResolvedValue({
        customerId: 4,
        username: 'testuser',
        email: '50.003.c4g1@gmail.com',
        password: '$2a$10$2Dwyy1XtOFfGADjmnUiXIePL5lmw9S1NM7itpripzgVj1CncS5LR6',
        hp: '12345678',
        resetPasswordToken: null,
        resetPasswordExpires: null});
    
    const res = await request(app)
        .post('/api/auth/register')
        .send({email: '50.003.c4g1@gmail.com', password: 'Password@12345', username: 'testuser', hp: '12345678'});
    
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'User already exists');
  });

  it ('(Register) should return 201 if registration is successful', async () => {
    findUserByEmail.mockResolvedValue(null);
    insertCustomer.mockResolvedValue(1);

    const bcrypt = require('bcryptjs');
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-password');

    const jwt = require('jsonwebtoken');
    jest.spyOn(jwt, 'sign').mockReturnValue('fake-jwt-token');

    const res = await request(app)
        .post('/api/auth/register')
        .send({email: '50.003.c4g1@gmail.com', password: 'Password@12345', username: 'testuser', hp: '12345678'});
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('token', 'fake-jwt-token');
    expect(res.body).toHaveProperty('userId', 1);
    expect(res.body).toHaveProperty('username', 'testuser');
  });

  it ('(Register) should return 500 if an error occurs with the server during registration', async () => {
    findUserByEmail.mockImplementation(() => {
        throw new Error('Database query failed');
    });

    const res = await request(app)
        .post('/api/auth/register')
        .send({email: '50.003.c4g1@gmail.com', password: 'Password@12345', username: 'testuser', hp: '12345678'});
    
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'Server error');
  });

  // for resetPassword function
  it ('(Forgot Password) should return 404 if user not found', async () => {
    findUserByEmail.mockResolvedValue(null);

    const res = await request(app)
        .post('/api/auth/forgot-password')
        .send({email: '50.003.c4g1@gmail.com'})
    
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'Email not found');
  });

  it ('(Forgot Password) should return 200 if reset password email is sent successfully', async () => {
    findUserByEmail.mockResolvedValue({
        customerId: 4,
        username: 'testuser',
        email: '50.003.c4g1@gmail.com',
        password: '$2a$10$2Dwyy1XtOFfGADjmnUiXIePL5lmw9S1NM7itpripzgVj1CncS5LR6',
        hp: '12345678',
        resetPasswordToken: null,
        resetPasswordExpires: null})
    
    const crypto = require('crypto');
    jest.spyOn(crypto, 'randomBytes').mockReturnValue({toString: jest.fn().mockReturnValue('fake-reset-token')});

    updateUser.mockResolvedValue(true);

    const res = await request(app)
        .post('/api/auth/forgot-password')
        .send({email: '50.003.c4g1@gmail.com'});
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'Email sent');
  });

  it ('(Forgot Password) should return 500 if an error occurs with the server during reset password', async () => {
    findUserByEmail.mockImplementation(() => {
        throw new Error('Database query failed');
    });

    const res = await request(app)
        .post('/api/auth/forgot-password')
        .send({email: '50.003.c4g1@gmail.com'});
    
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'Server error');
  });

  it ('(Reset Password) should return 404 if user not found', async () => {
    findUserByToken.mockResolvedValue(null);

    const res = await request(app)
        .post('/api/auth/reset-password')
        .send({token: 'fake-token', password: 'Password@12345'});
    
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'Token is invalid or has expired');
  });

  it ('(Reset Password) should return 200 if password is reset successfully', async () => {
    findUserByToken.mockResolvedValue({
        customerId: 4,
        username: 'testuser',
        email: '50.003.c4g1@gmail.com',
        password: '$2a$10$2Dwyy1XtOFfGADjmnUiXIePL5lmw9S1NM7itpripzgVj1CncS5LR6',
        hp: '12345678',
        resetPasswordToken: 'fake-token',
        resetPasswordExpires: Date.now() + 3600000})
    
    const bcrypt = require('bcryptjs');
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-password');

    updateUser.mockResolvedValue(true);

    const res = await request(app)
        .post('/api/auth/reset-password')
        .send({token: 'fake-token', password: 'Password@12345'});
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('message', 'Password has been reset successfully');
  });

  it ('(Reset Password) should return 500 if an error occurs with the server during reset password', async () => {
    findUserByToken.mockImplementation(() => {
        throw new Error('Database query failed');
    });

    const res = await request(app)
        .post('/api/auth/reset-password')
        .send({token: 'fake-token', password: 'Password@12345'});
    
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('success', false);
    expect(res.body).toHaveProperty('message', 'Server error');
  });
});
