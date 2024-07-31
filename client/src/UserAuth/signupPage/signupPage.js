import React, { useState } from 'react';
import PageHeader from '../../pageHeader/pageHeader';
import { validateEmail, validatePassword } from '../validation';
import { Link } from 'react-router-dom';
import {
  InputLabel,
  InputAdornment,
  IconButton,
  Input,
  Button
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './signupPage.css';

function Signup() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    passwordStrength: '',
    error: ''
  });

  const handlePasswordChange = (prop) => (event) => {
    const value = event.target.value;
    setValues((prevValues) => ({ ...prevValues, [prop]: value }));
    
    if (prop === 'password') {
      if (value.length >= 8) {
        if (/[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value) && /[^A-Za-z0-9]/.test(value)) {
          setValues((prevValues) => ({ ...prevValues, passwordStrength: 'strong' }));
        } else {
          setValues((prevValues) => ({ ...prevValues, passwordStrength: 'medium' }));
        }
      } else {
        setValues((prevValues) => ({ ...prevValues, passwordStrength: 'weak' }));
      }
    }
  };

  const handleClickShowPassword = (field) => () => {
    setValues((prevValues) => ({ ...prevValues, [field]: !prevValues[field] }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = values;
    if (!validateEmail(email)) {
      setValues((prevValues) => ({ ...prevValues, error: 'Please enter a valid email address.' }));
      return;
    }
    if (!validatePassword(password)) {
      setValues((prevValues) => ({ ...prevValues, error: 'Password must be at least 8 characters long and include one lowercase letter, one uppercase letter, one digit, and one special character.' }));
      return;
    }
    if (password !== confirmPassword) {
      setValues((prevValues) => ({ ...prevValues, error: 'Passwords do not match.' }));
      return;
    }
    setValues((prevValues) => ({ ...prevValues, error: '' }));
    // Handle signup logic here
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <>
      <PageHeader />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSignup}>
          <h2>Sign Up</h2>
          {values.error && <p className="error-message">{values.error}</p>}
          <div className="form-group">
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input
              id="email"
              type="email"
              value={values.email}
              onChange={handlePasswordChange('email')}
              fullWidth
              required
            />
          </div>
          <div className="form-group">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handlePasswordChange('password')}
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword('showPassword')}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <div className={`password-strength ${values.passwordStrength}`}>
              {values.passwordStrength && <span>{values.passwordStrength.toUpperCase()}</span>}
            </div>
          </div>
          <div className="form-group">
            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
            <Input
              id="confirm-password"
              type={values.showConfirmPassword ? 'text' : 'password'}
              value={values.confirmPassword}
              onChange={handlePasswordChange('confirmPassword')}
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword('showConfirmPassword')}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {values.password !== values.confirmPassword && values.confirmPassword && (
              <p className="error-message">Passwords do not match.</p>
            )}
          </div>
          <Button type="submit" variant="contained" color="primary" fullWidth className="signup-button">
            Create Account
          </Button>
          <div className="link-container">
            <Link to="/login" className="link create-account-link">Already have an account? Login</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
