import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import CreditCard from '../../PaymentMethod/creditCard.js';

describe('CreditCard Component', () => {``
    test('renders CreditCard component correctly', () => {
        render(<CreditCard />);

//         // Check for static texts
        expect(screen.getByText('New Card')).toBeInTheDocument();
        // expect(screen.getByText("Cardholder's Name*")).toBeInTheDocument();
//         expect(screen.getByText('Card Number*')).toBeInTheDocument();
//         expect(screen.getByText('Expiry Date*')).toBeInTheDocument();
//         expect(screen.getByText('CVC*')).toBeInTheDocument();

//         // Check for input fields
//         expect(screen.getByPlaceholderText('MM/YY')).toBeInTheDocument();
        // efxpect(screen.getByRole('textbox', { name: "Cardholder's Name*" })).toBeInTheDocument();
//         expect(screen.getByRole('textbox', { name: 'Card Number*' })).toBeInTheDocument();
//         expect(screen.getByRole('textbox', { name: 'Expiry Date*' })).toBeInTheDocument();
//         expect(screen.getByRole('textbox', { name: 'CVC*' })).toBeInTheDocument();
    });

//     test('validates required input fields', async () => {
//         render(<CreditCard />);

//         // const nameInput = screen.getByRole('textbox', { name: "Cardholder's Name*" });
//         // const numberInput = screen.getByRole('textbox', { name: 'Card Number*' });
//         const dateInput = screen.getByPlaceholderText('MM/YY');
//         // const cvcInput = screen.getByRole('textbox', { name: 'CVC*' });

//         // Check for required attributes
//         // expect(nameInput).toBeRequired();
//         // expect(numberInput).toBeRequired();
//         expect(dateInput).toBeRequired();
//         // expect(cvcInput).toBeRequired();

//         // Simulate user interaction
//         // await userEvent.type(nameInput, 'John Doe');
//         // await userEvent.type(numberInput, '1234567812345678');
//         await userEvent.type(dateInput, '12/25');
//         // await userEvent.type(cvcInput, '123');

//         // Validate entered values
//         // expect(nameInput).toHaveValue('John Doe');
//         // expect(numberInput).toHaveValue('1234567812345678');
//         expect(dateInput).toHaveValue('12/25');
//         // expect(cvcInput).toHaveValue('123');
//     });
});
