import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Signup from '../../UserAuth/signupPage/signupPage';
import authService from '../../UserAuth/authServices/authServices';
import { UserProvider } from '../../contexts/UserContext';

jest.mock('../../UserAuth/authServices/authServices');

describe('Signup Component', () => {
  beforeEach(() => {
    authService.register.mockClear();
  });

  const renderComponent = () => {
    render(
      <UserProvider>
        <MemoryRouter initialEntries={['/signup']}>
          <Routes>
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </MemoryRouter>
      </UserProvider>
    );
  };

  test('TC_SU_001: Renders sign up form correctly', () => {
    renderComponent();
    expect(screen.getByRole('heading', { name: /Sign Up/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
  });

  test('TC_SU_002: Validates email input', async () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalidemail' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  test('TC_SU_003: Validates password strength', () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123456' } });
    expect(screen.getByText(/weak/i)).toBeInTheDocument();
  });

  test('TC_SU_004: Validates password match', async () => {
    renderComponent();
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });
  });

  test('TC_SU_006: Handles registration errors', async () => {
    authService.register.mockRejectedValue(new Error('Server error'));

    renderComponent();
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '123456789' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'Password123!' } });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Create Account/i }));
    });

    await waitFor(() => {
      expect(authService.register).toHaveBeenCalledWith('test@example.com', 'Password123!', 'testuser', '123456789');
      expect(screen.getByText(/An error occurred. Please try again later/i)).toBeInTheDocument();
    });
  });
});
