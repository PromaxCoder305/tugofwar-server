const express = require('express');
const router = express.Router();
const { loginUser } = require('../controls/authcontrol');

// Login route
router.post('/login', loginUser);

// Email confirmation route

module.exports = router;
