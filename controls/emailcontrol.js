const crypto = require("crypto");
const User = require("../models/usermodel");
const transporter = require("../config/emailConfig");

let emailTokens = {};

exports.loginUser = async (req, res) => {
  const { name, email } = req.body;

  const token = crypto.randomBytes(20).toString("hex");
  emailTokens[token] = { name, email, confirmed: false };

  const confirmationUrl = `http://localhost:6001/confirm/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Please confirm your email",
    text: `Hi ${name},\n\nPlease click the link to confirm your email: ${confirmationUrl}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.status(500).send("Error sending confirmation email.");
    }
    res.status(200).send("Confirmation email sent. Please check your inbox.");
  });
};

exports.confirmEmail = (req, res) => {
  const token = req.params.token;

  if (!emailTokens[token]) {
    return res.status(400).send("Invalid token.");
  }

  const user = emailTokens[token];

  if (user.confirmed) {
    return res.status(200).send("Email already confirmed.");
  }

  user.confirmed = true;
  res.status(200).send("Email confirmed. You can now comment.");
};
