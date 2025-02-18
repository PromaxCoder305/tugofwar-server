const crypto = require("crypto");
const User = require("../models/usermodel");
const transporter = require("../config/emailconfig"); // Assuming Nodemailer config is in emailconfig.js

// Handle user login and send email confirmation
const loginUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Please provide both name and email.' });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      console.log(`Creating new user: ${name} (${email})`);
      // Since the user was not found, create a new user object
      user = new User({
        name: name,
        email: email,
        confirmed: false, // Set confirmed to false initially
      });
      await user.save(); // Save the new user to the database
      console.log(`New user saved: ${user}`);
    }

    // Generate a confirmation token for the user
    const confirmationToken = crypto.randomBytes(20).toString('hex');
    user.confirmationToken = confirmationToken;
    user.confirmationTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour

    await user.save(); // Save the user with the confirmation token

    // Create a confirmation URL
    const confirmationUrl = `http://localhost:6001/confirm-email/${confirmationToken}`;

    // Prepare the email
    const mailOptions = {
      from: 'rajitharajan004@gmail.com', // Your email address
      to: user.email,
      subject: 'Email Confirmation',
      text: `Click the following link to confirm your email: ${confirmationUrl}`,
    };

    // Send the confirmation email
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent successfully.");

    // Store user in session (if using sessions)
    req.session.user = user;
    console.log(`User logged in: ${user}`);

    // Respond back to the client
    res.status(200).json({ message: 'Login successful, confirmation email sent', user });

  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
};

module.exports = {
  loginUser,
};
