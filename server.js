const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // Import connect-mongo
const router = require('./routes/authrouter');
const contentRoutes = require('./routes/contentrouter');
const videoRoutes = require('./routes/videorouter');
const commentRoutes = require('./routes/commentrouter');
const path = require('path');

const app = express();

// Enable CORS and JSON parsing
app.use(cors({
  origin: "https://tugofwar-client.onrender.com",  // Allow only your frontend
  methods: "GET,POST,PUT,DELETE", 
  allowedHeaders: "Content-Type,Authorization"
}));
app.use(express.json());

// MongoDB connection string with database name
const MONGO_URI = "mongodb+srv://tugofwar_db:tugofwar@cluster0.4obgs.mongodb.net/tugofwar_db?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Set up session management
app.use(session({
  secret: 'secret123', // Replace with a strong secret
  resave: false,
  saveUninitialized: false, // Recommended to avoid unnecessary sessions
  store: MongoStore.create({
    mongoUrl: MONGO_URI, // Use the same MongoDB connection string
    ttl: 24 * 60 * 60, // Session expiration (1 day)
  }),
  cookie: { maxAge: 1000 * 60 * 60 * 24, secure: false }, // Set secure: true in production with HTTPS
}));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up routes
app.use('/api', router);
app.use('/content', contentRoutes);
app.use('/videos', videoRoutes);
app.use('/comments', commentRoutes);

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
