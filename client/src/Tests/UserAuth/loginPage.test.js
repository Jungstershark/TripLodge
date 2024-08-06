import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../UserAuth/loginPage/loginPage';
import authService from '../../UserAuth/authServices/authServices';
import { validateEmail, validatePassword } from '../../UserAuth/validation';

jest.mock('../../UserAuth/authServices/authServices');
jest.mock('../../UserAuth/validation');

describe('Login Component', () => {
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
  };

  beforeEach(() => {
    authService.login.mockClear();
    validateEmail.mockClear();
    validatePassword.mockClear();
  });

  test('TC_L_001: Renders login form correctly', () => {
    renderWithRouter(<Login />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
    expect(screen.getByText(/Forgot Password?/i)).toBeInTheDocument();
    expect(screen.getByText(/Create account/i)).toBeInTheDocument();
  });

  test('TC_L_002: Validates email and password fields', async () => {
    validateEmail.mockReturnValue(false);
    validatePassword.mockReturnValue(false);

    renderWithRouter(<Login />);

    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'short' } });

    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address./i)).toBeInTheDocument();
      expect(screen.getByText(/Password must be at least 8 characters long and include one lowercase letter, one uppercase letter, one digit, and one special character./i)).toBeInTheDocument();
      expect(screen.getByText(/Next/i)).toBeDisabled();
    });
  });

  test('TC_L_003: Handles successful login', async () => {
    validateEmail.mockReturnValue(true);
    validatePassword.mockReturnValue(true);
    authService.login.mockResolvedValue({ success: true });

    renderWithRouter(<Login />);

    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'Valid123!' } });
    fireEvent.click(screen.getByText(/Next/i));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith('test@example.com', 'Valid123!');
      expect(window.location.pathname).toBe('/');
    });
  });

  test('TC_L_004: Handles login errors', async () => {
    validateEmail.mockReturnValue(true);
    validatePassword.mockReturnValue(true);
    authService.login.mockResolvedValue({ success: false, message: 'Invalid credentials' });

    renderWithRouter(<Login />);

    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'Valid123!' } });
    fireEvent.click(screen.getByText(/Next/i));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith('test@example.com', 'Valid123!');
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });

  test('TC_L_005: Handles server errors', async () => {
    validateEmail.mockReturnValue(true);
    validatePassword.mockReturnValue(true);
    authService.login.mockRejectedValue(new Error('Server error'));

    renderWithRouter(<Login />);

    fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'Valid123!' } });
    fireEvent.click(screen.getByText(/Next/i));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith('test@example.com', 'Valid123!');
      expect(screen.getByText(/An error occurred. Please try again later./i)).toBeInTheDocument();
    });
  });
});
