// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import Login from '../../UserAuth/loginPage/loginPage';
// import authService from '../../UserAuth/authServices/authServices';
// import { UserProvider } from '../../contexts/UserContext';

// jest.mock('../../UserAuth/authServices/authServices');

// describe('Login Component', () => {
//   const renderWithRouter = (ui, { route = '/' } = {}) => {
//     window.history.pushState({}, 'Test page', route);
//     return render(ui, { wrapper: BrowserRouter });
//   };

//   beforeEach(() => {
//     authService.login.mockClear();
//   });

//   test('TC_L_001: Renders login form correctly', () => {
//     renderWithRouter(
//       <UserProvider>
//         <Login />
//       </UserProvider>
//     );
//     expect(screen.getByText(/Login/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
//     expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
//     expect(screen.getByText(/Next/i)).toBeInTheDocument();
//     expect(screen.getByText(/Forgot Password?/i)).toBeInTheDocument();
//     expect(screen.getByText(/Create account/i)).toBeInTheDocument();
//   });

//   test('TC_L_002: Validates email and password fields', async () => {
//     renderWithRouter(
//       <UserProvider>
//         <Login />
//       </UserProvider>
//     );

//     fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'invalid-email' } });
//     fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'short' } });
//     fireEvent.click(screen.getByText(/Next/i));

//     await waitFor(() => {
//       expect(screen.getByText(/Invalid email and\/or password/i)).toBeInTheDocument();
//     });
//   });

//   test('TC_L_003: Handles successful login', async () => {
//     authService.login.mockResolvedValue({ success: true, username: 'testuser', token: 'dummytoken' });

//     renderWithRouter(
//       <UserProvider>
//         <Login />
//       </UserProvider>
//     );

//     fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
//     fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'Valid123!' } });
//     fireEvent.click(screen.getByText(/Next/i));

//     await waitFor(() => {
//       expect(authService.login).toHaveBeenCalledWith('test@example.com', 'Valid123!');
//       expect(window.location.pathname).toBe('/');
//     });
//   });

//   test('TC_L_004: Handles login errors', async () => {
//     authService.login.mockResolvedValue({ success: false, message: 'Invalid credentials' });

//     renderWithRouter(
//       <UserProvider>
//         <Login />
//       </UserProvider>
//     );

//     fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
//     fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'Valid123!' } });
//     fireEvent.click(screen.getByText(/Next/i));

//     await waitFor(() => {
//       expect(authService.login).toHaveBeenCalledWith('test@example.com', 'Valid123!');
//       expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
//     });
//   });

//   test('TC_L_005: Handles server errors', async () => {
//     authService.login.mockRejectedValue(new Error('Server error'));

//     renderWithRouter(
//       <UserProvider>
//         <Login />
//       </UserProvider>
//     );

//     fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
//     fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'Valid123!' } });
//     fireEvent.click(screen.getByText(/Next/i));

//     await waitFor(() => {
//       expect(authService.login).toHaveBeenCalledWith('test@example.com', 'Valid123!');
//       expect(screen.getByText(/Invalid email and\/or password/i)).toBeInTheDocument();
//     });
//   });
// });
