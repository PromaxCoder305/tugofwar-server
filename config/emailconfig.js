const nodemailer = require('nodemailer');

// Create a transporter object using Gmail SMTP settings
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Gmail service (you can use another service like Yahoo or Outlook)
  auth: {
    user: 'rajitharajan004@gmail.com',  // Replace with your Gmail address
    pass: 'hjpe tkln ucvf mjrp',     // Replace with your Gmail App Password or email password
  },
  tls: {
    rejectUnauthorized: false, // Required to avoid TLS errors
  }
});

// Export the transporter so it can be used in other files
module.exports = transporter;
