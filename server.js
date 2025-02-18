const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const router = require('./routes/authrouter');
const contentRoutes = require('./routes/contentrouter');
const videoRoutes = require('./routes/videorouter');
const commentroutes = require('./routes/commentrouter');

const path = require('path');

const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Set up session management
app.use(session({
  secret: 'secret123', // Replace with your own secret string
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Change to true in production with HTTPS
}));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up routes
app.use('/api', router);
app.use('/content', contentRoutes);
app.use('/videos', videoRoutes);
app.use('/comments', commentroutes);

// MongoDB connection
mongoose.connect("mongodb+srv://tugofwar_db:tugofwar@cluster0.4obgs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  
});

const PORT = 6001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
