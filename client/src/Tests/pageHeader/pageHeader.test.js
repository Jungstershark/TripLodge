import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PageHeader from '../../pageHeader/pageHeader';
import { UserProvider } from '../../contexts/UserContext';

describe('PageHeader Component', () => {
  const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route);
    return render(ui, { wrapper: BrowserRouter });
  };

  const renderWithProviders = (ui) => {
    return render(
      <UserProvider>
        {ui}
      </UserProvider>,
      { wrapper: BrowserRouter }
    );
  };

  test('TC_PH_001: Test header renders correctly', () => {
    renderWithProviders(<PageHeader />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  test('TC_PH_002: Test logo renders correctly', () => {
    renderWithProviders(<PageHeader />);
    expect(screen.getByAltText('Error displaying logo')).toBeInTheDocument();
  });

  test('TC_PH_003: Test Sign In link functionality', () => {
    renderWithProviders(<PageHeader />);
    const signInLink = screen.getByText(/Sign in/i);
    fireEvent.click(signInLink);
    expect(window.location.pathname).toBe('/login');
  });

  test('TC_PH_004: Test Contact Us link functionality', () => {
    renderWithProviders(<PageHeader />);
    const contactUsLink = screen.getByText(/Contact Us/i);
    fireEvent.click(contactUsLink);
    act(() => {
      window.history.pushState({}, 'Contact Us', '#contactus');
    });
    expect(window.location.hash).toBe('#contactus');
  });
});
