import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authService from '../authServices/authServices';
import { InputLabel, Input, Button } from '@mui/material';
import './resetPassword.css';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    try {
      const response = await authService.resetPassword(token, password);
      if (response.success) {
        setSuccess('Password has been reset successfully.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Error resetting password.');
    }
  };

  return (
    <div className="reset-password-container">
      <form className="reset-password-form" onSubmit={handleResetPassword}>
        <h2>Reset Password</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <div className="form-group">
          <InputLabel htmlFor="password">New Password</InputLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            required
          />
        </div>
        <div className="form-group">
          <InputLabel htmlFor="confirmPassword">Confirm New Password</InputLabel>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            fullWidth
            required
          />
        </div>
        <Button type="submit" variant="contained" color="primary" fullWidth className="reset-password-button">
          Reset Password
        </Button>
      </form>
    </div>
  );
}

export default ResetPassword;
