const crypto = require("crypto");
const User = require("../models/usermodel");
const transporter = require("../config/emailconfig"); // Assuming Nodemailer config is in emailconfig.js

let emailTokens = {}; // Temporary storage for tokens

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
      user = new User({id: user._id,
        name: user.name,
        email: user.email,
        confirmed: user.confirmed}); // Set confirmed to false initially
      await user.save();
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

// Handle email confirmation
const confirmEmail = async (req, res) => {
  const token = req.params.token;

  try {
    // Find user with the confirmation token
    const user = await User.findOne({ confirmationToken: token, confirmationTokenExpiration: { $gt: Date.now() } });

    if (!user) {
      return res.status(400).send("Invalid or expired token.");
    }

    // Mark the user as confirmed
    user.confirmed = true;
    user.confirmationToken = null; // Clear the token
    user.confirmationTokenExpiration = null; // Clear the expiration date

    await user.save(); // Save the updated user

    res.status(200).send("Email confirmed. You can now comment.");

  } catch (err) {
    console.error("Error confirming email:", err);
    res.status(500).send("There was an error confirming your email.");
  }
};

module.exports = {
  loginUser,
  confirmEmail,
};
