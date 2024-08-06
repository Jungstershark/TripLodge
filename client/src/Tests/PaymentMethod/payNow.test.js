import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PayNow from '../../PaymentMethod/payNow.js';

test('renders PayNow component', () => {
  render(<PayNow />);
  
  // Check if the header is present
  const headerElement = screen.getByText(/Scan The QR Code Below to complete Payment/i);
  expect(headerElement).toBeInTheDocument();
  
  // Check if the QR code container is present
  const qrCodeContainer = screen.getByText(/Image of QR code generated/i);
  expect(qrCodeContainer).toBeInTheDocument();
});



//passed 
