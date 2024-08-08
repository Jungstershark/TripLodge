// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';
// import ResetPassword from '../../UserAuth/resetPassword/resetPassword';
// import authService from '../../UserAuth/authServices/authServices';

// jest.mock('../../UserAuth/authServices/authServices');

// describe('ResetPassword Component', () => {
//   beforeEach(() => {
//     authService.resetPassword.mockClear();
//   });

//   test('TC_RP_001: Renders reset password form correctly', () => {
//     render(
//       <MemoryRouter initialEntries={['/reset-password/token123']}>
//         <Routes>
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//         </Routes>
//       </MemoryRouter>
//     );
//     expect(screen.getByRole('heading', { name: /Reset Password/i })).toBeInTheDocument();
//     expect(screen.getByLabelText('New Password')).toBeInTheDocument();
//     expect(screen.getByLabelText('Confirm New Password')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /Reset Password/i })).toBeInTheDocument();
//   });

//   test('TC_RP_002: Validates password match', async () => {
//     render(
//       <MemoryRouter initialEntries={['/reset-password/token123']}>
//         <Routes>
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//         </Routes>
//       </MemoryRouter>
//     );

//     fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'Password123!' } });
//     fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'Password123' } });
//     fireEvent.click(screen.getByRole('button', { name: /Reset Password/i }));

//     await waitFor(() => {
//       expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
//     });
//   });

//   test('TC_RP_003: Handles successful password reset', async () => {
//     authService.resetPassword.mockResolvedValue({ success: true });

//     render(
//       <MemoryRouter initialEntries={['/reset-password/token123']}>
//         <Routes>
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//           <Route path="/login" element={<div>Login Page</div>} />
//         </Routes>
//       </MemoryRouter>
//     );

//     fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'Password123!' } });
//     fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'Password123!' } });
//     fireEvent.click(screen.getByRole('button', { name: /Reset Password/i }));

//     await waitFor(() => {
//       expect(authService.resetPassword).toHaveBeenCalledWith('token123', 'Password123!');
//       expect(screen.getByText(/Password has been reset successfully/i)).toBeInTheDocument();
//     });

//     await waitFor(() => {
//       expect(screen.queryByText(/Login Page/i)).toBeInTheDocument();
//     }, { timeout: 3000 });
//   });

//   test('TC_RP_004: Handles password reset errors', async () => {
//     authService.resetPassword.mockRejectedValue(new Error('Server error'));

//     render(
//       <MemoryRouter initialEntries={['/reset-password/token123']}>
//         <Routes>
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//         </Routes>
//       </MemoryRouter>
//     );

//     fireEvent.change(screen.getByLabelText('New Password'), { target: { value: 'Password123!' } });
//     fireEvent.change(screen.getByLabelText('Confirm New Password'), { target: { value: 'Password123!' } });
//     fireEvent.click(screen.getByRole('button', { name: /Reset Password/i }));

//     await waitFor(() => {
//       expect(authService.resetPassword).toHaveBeenCalledWith('token123', 'Password123!');
//       expect(screen.getByText(/Error resetting password/i)).toBeInTheDocument();
//     });
//   });
// });
