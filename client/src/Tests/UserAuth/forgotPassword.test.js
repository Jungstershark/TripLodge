import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ForgotPassword from '../../UserAuth/forgotPasswordPage/forgotPasswordPage';
import authService from '../../UserAuth/authServices/authServices';
import {act} from 'react'

// Mock the authService
jest.mock('../../UserAuth/authServices/authServices');

describe('ForgotPassword Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <ForgotPassword />
      </BrowserRouter>
    );
  };

  test('renders Forgot Password form correctly', () => {
    renderComponent();
    expect(screen.getByText(/Forgot Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Reset Link/i })).toBeInTheDocument();
  });

  test('shows validation error for invalid email', async () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalidemail' } });
    fireEvent.click(screen.getByRole('button', { name: /Send Reset Link/i }));

    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  test('shows success message on successful email submission', async () => {
    authService.forgotPassword.mockResolvedValue({ success: true, message: 'Email sent' });

    renderComponent();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Send Reset Link/i }));

    await waitFor(() => {
      expect(screen.getByText(/Password reset link has been sent to your email/i)).toBeInTheDocument();
    });
  });

  test('shows error message on unsuccessful email submission', async () => {
    authService.forgotPassword.mockResolvedValue({ success: false, message: 'Email not found' });

    renderComponent();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Send Reset Link/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email not found/i)).toBeInTheDocument();
    });
  });

  test('shows error message when service throws an error', async () => {
    authService.forgotPassword.mockRejectedValue(new Error('Network error'));

    renderComponent();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Send Reset Link/i }));

    await waitFor(() => {
      expect(screen.getByText(/Error sending reset link/i)).toBeInTheDocument();
    });
  });
});
