import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PaymentMethod from '../../PaymentMethod/paymentMethod.js';

describe('PaymentMethod Component', () => {
  test('renders Credit/Debit Card and PayNow/PayLah options', () => {
    render(<PaymentMethod />);

    expect(screen.getByLabelText(/Credit\/Debit Card/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/PayNow\/PayLah/i)).toBeInTheDocument();
  });

  test('renders CreditCard component when Credit/Debit Card is selected', () => {
    render(<PaymentMethod />);

    const creditCardRadio = screen.getByLabelText(/Credit\/Debit Card/i);

    act(() => {
      fireEvent.click(creditCardRadio);
    });

    expect(screen.getByText(/Credit Card Form/i)).toBeInTheDocument(); // Assuming "Credit Card Form" text exists in the CreditCard component
  });

  test('renders PayNow component when PayNow/PayLah is selected', () => {
    render(<PaymentMethod />);

    const payNowRadio = screen.getByLabelText(/PayNow\/PayLah/i);

    act(() => {
      fireEvent.click(payNowRadio);
    });

    expect(screen.getByText(/PayNow Form/i)).toBeInTheDocument(); // Assuming "PayNow Form" text exists in the PayNow component
  });

  test('images have correct alt text', () => {
    render(<PaymentMethod />);

    const images = screen.getAllByAltText(/Error displaying logo/i);

    expect(images).toHaveLength(2);
    expect(images[0]).toBeInTheDocument();
    expect(images[1]).toBeInTheDocument();
  });
});
