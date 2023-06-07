// const nodemailer = require('nodemailer');
import nodemailer from  'nodemailer'
import dotenv from "dotenv"
dotenv.config();

// Create a transporter using SMTP
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',  // SMTP server hostname
  port: 465,                 // SMTP server port
  secure: true,              // Set to true if using SSL/TLS
  auth: {
    user: 'sumeghkrishna123@gmail.com',   // SMTP username/email
    pass: process.env.Pass,             // SMTP password
  },
});

// Define the email options
export let mailOptions = {
  from: 'sumeghkrishna123@gmail.com',       // Sender email address
  to: 'sumeghspai@gmail.com' ,         // Recipient email address
  subject: 'Hello akash from Node.js',        // Email subject
  text: 'This is the email body.',      // Plain text body
  //html: '<p>This is the email html body.</p>', // HTML body (optional)
};

// // Send the email
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error('Error sending email:', error);
//   } else {
//     console.log('Email sent:', info.response);
//   }
// });
