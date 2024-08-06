import React, { useState, useEffect, useContext } from 'react';
import PageHeader from '../../pageHeader/pageHeader';
import './loginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../authServices/authServices'; // Import authService
import UserContext from '../../contexts/UserContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { login: setUser } = useContext(UserContext); // Access login function from context

  useEffect(() => {
    setFormValid(email !== '' && password !== '');
  }, [email, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formValid) {
      setLoginError('Invalid email and/or password');
      return;
    }
    try {
      const data = await authService.login(email, password);
      if (data.success) {
        console.log('Login successful');
        setUser({ username: data.username, token: data.token }); // Update UserContext
        navigate('/');
      } else {
        setLoginError(data.message || 'Invalid email and/or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginError('Invalid email and/or password');
    }
  };

  return (
    <>
      <PageHeader />
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className={`form-group ${loginError ? 'error' : ''}`}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={`form-group ${loginError ? 'error' : ''}`}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
