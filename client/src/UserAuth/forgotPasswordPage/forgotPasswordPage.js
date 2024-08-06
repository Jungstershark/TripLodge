// src/UserAuth/forgotPasswordPage/forgotPasswordPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputLabel, Input, Button } from '@mui/material';
import authService from '../authServices/authServices';
import './forgotPasswordPage.css';

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    try {
      const response = await authService.forgotPassword(email);
      if (response.success) {
        setSuccess('Password reset link has been sent to your email.');
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Error sending reset link.');
    }
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleForgotPassword}>
        <h2>Forgot Password</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <div className="form-group">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            required
          />
        </div>
        <Button type="submit" variant="contained" color="primary" fullWidth className="forgot-password-button">
          Send Reset Link
        </Button>
      </form>
    </div>
  );
}

export default ForgotPassword;
