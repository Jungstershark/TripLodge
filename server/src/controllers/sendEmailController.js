import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config(); // allows us to use process.env to access environment variables

// Create a transporter object using SMTP transport with Gmail (Mail server config)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PW // app password
  }
});

async function sendBookingConfirmationEmail(booking, customerEmailAddress) {
  const mailOptions = {
    from: 'Ascenda Hotel Booking', 
    to: [customerEmailAddress], // receipient
    subject: 'Booking Confirmation', // Subject line
    text: `Your booking has been confirmed. Booking id: ${booking.bookingId}`
  }

  let info = await transporter.sendMail(mailOptions);
  console.log('Email sent: %s', info.messageId);
}

export { sendBookingConfirmationEmail };



