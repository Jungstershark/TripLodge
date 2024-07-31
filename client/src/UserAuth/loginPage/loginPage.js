import React, { useState } from 'react';
import PageHeader from '../../pageHeader/pageHeader';
import { validateEmail, validatePassword } from '../validation';
import './loginPage.css';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and include one lowercase letter, one uppercase letter, one digit, and one special character.');
      return;
    }
    setError('');
    // Handle login logic here
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <>
      <PageHeader />
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Next</button>
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
