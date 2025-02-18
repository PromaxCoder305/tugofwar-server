const express = require('express');
const router = express.Router();
const { loginUser, confirmEmail } = require('../controls/authcontrol');

// Login route
router.post('/login', loginUser);

// Email confirmation route
router.get('/confirm/:token', confirmEmail);

module.exports = router;
