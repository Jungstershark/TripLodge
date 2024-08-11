const nodemailer = require('nodemailer');
const { sendBookingConfirmationEmail, sendCancelBookingEmail } = require('../../src/controllers/sendEmailController');

jest.mock('nodemailer');

describe('Email Service Tests', () => {
  let sendMailMock;

  beforeEach(() => {
    jest.clearAllMocks();
    sendMailMock = jest.fn();
    // Mock nodemailer.createTransport to return an object with sendMail method
    nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });
  });

  const booking = {
    id: '12345',
    customerName: 'John Doe',
    customerEmail: 'john.doe@gmail.com',
    checkInDate: '2024-08-15',
    checkOutDate: '2024-08-20',
    numberOfGuests: 2,
    totalPrice: 500.00,
  };

  const hotel = {
    name: 'Ascenda Hotel',
    address: '123 Main St, Hometown, HT 12345',
    contactEmail: 'contact@ascendahotel.com',
    phoneNumber: '123-456-7890',
  };

  const customerEmailAddress = 'john.doe@example.com';

  it('sendBookingConfirmationEmail sends an email successfully', async () => {
    sendMailMock.mockResolvedValueOnce({ messageId: 'mocked-message-id' });

    // Act & Assert
    await expect(sendBookingConfirmationEmail(booking, hotel, customerEmailAddress)).resolves.not.toThrow();
    expect(sendMailMock).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalledWith(expect.objectContaining({
      from: 'Ascenda Hotel Booking',
      to: customerEmailAddress,
      subject: 'Booking Confirmation',
    }));
  });

  it('sendBookingConfirmationEmail throws an error if email fails to send', async () => {
    const errorMessage = 'Failed to send email';
    sendMailMock.mockRejectedValueOnce(new Error(errorMessage));
    await expect(sendBookingConfirmationEmail(booking, hotel, customerEmailAddress)).rejects.toThrow('Failed to send booking confirmation email');
    expect(sendMailMock).toHaveBeenCalledTimes(1);
  });

  it('sendCancelBookingEmail sends an email successfully', async () => {
    sendMailMock.mockResolvedValueOnce({ messageId: 'mocked-message-id' });
    await expect(sendCancelBookingEmail(booking, hotel, customerEmailAddress)).resolves.not.toThrow();
    expect(sendMailMock).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalledWith(expect.objectContaining({
      from: 'Ascenda Hotel Booking',
      to: customerEmailAddress,
      subject: 'Booking Cancellation',
      // Add other expected properties here if needed
    }));
  });

  it('sendCancelBookingEmail throws an error if email fails to send', async () => {
    // Arrange
    const errorMessage = 'Failed to send email';
    sendMailMock.mockRejectedValueOnce(new Error(errorMessage));

    // Act & Assert
    await expect(sendCancelBookingEmail(booking, hotel, customerEmailAddress)).rejects.toThrow('Failed to send booking confirmation email');
    expect(sendMailMock).toHaveBeenCalledTimes(1);
  });
});
