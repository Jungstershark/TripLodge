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

async function sendBookingConfirmationEmail(booking, hotel, customerEmailAddress) {
  const mailOptions = {
    from: 'Ascenda Hotel Booking', 
    to: [customerEmailAddress], // receipient
    subject: `Booking Confirmation - ${hotel.name}`, // Subject line
    text: `
    Dear ${booking.guestSalutation} ${booking.guestLastName},

    Thank you for choosing ${hotel.name} for your stay. We are pleased to inform you that your booking has been confirmed as per the details below:
    
    - Booking ID: ${booking.bookingId}
    - Number of guests: ${booking.numAdults} adults and ${booking.numChildren} children
    - Room type: ${booking.roomTypes}
    - Check-in date: ${booking.startDate}
    - Check-out date: ${booking.endDate}
    - Hotel address: ${hotel.address}

    If you wish to cancel your booking, please head over to this link: <WIP - special link based on bookingId>

    Best regards,
    Ascenda Project Team C4G1
    `
  }

  let info = await transporter.sendMail(mailOptions);
  console.log('Email sent: %s', info.messageId);
}

export { sendBookingConfirmationEmail };



