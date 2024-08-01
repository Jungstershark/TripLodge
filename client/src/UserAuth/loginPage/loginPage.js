import React, { useState, useEffect } from 'react';
import PageHeader from '../../pageHeader/pageHeader';
import { validateEmail, validatePassword } from '../validation';
import './loginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../authServices/authServices';  // Import authService

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setEmailError(validateEmail(email) ? '' : 'Please enter a valid email address.');
    setPasswordError(validatePassword(password) ? '' : 'Password must be at least 8 characters long and include one lowercase letter, one uppercase letter, one digit, and one special character.');
    setFormValid(validateEmail(email) && validatePassword(password));
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formValid) {
      return;
    }
    try {
      const data = await authService.login(email, password);  // Use authService
      if (data.success) {
        console.log('Login successful');
        navigate('/');  // Redirect to the desired page upon successful login
      } else {
        setLoginError(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.data) {
        setLoginError(error.response.data.message);  // Display the server error message
      } else {
        setLoginError('An error occurred. Please try again later.');
      }
    }
  };
  

  return (
    <>
      <PageHeader />
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className={`form-group ${emailError ? 'error' : ''}`}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
          <div className={`form-group ${passwordError ? 'error' : ''}`}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          {loginError && <p className="login-error-message">{loginError}</p>}
          <button type="submit" className="login-button" disabled={!formValid}>Next</button>
          <div className="link-container">
            <Link to="/forgot-password" className="link">Forgot Password?</Link>
            <Link to="/signup" className="link create-account-link">Create account</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
