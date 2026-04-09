const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const connectDB = require('./config/database');
const linkRoutes = require('./routes/links');
const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/reports');
const { errorHandler } = require('./middleware/auth');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

app.use('/api/', limiter);

// Routes
app.use('/api/links', linkRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'LinkShield API is running' });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Connect to database and start server
const PORT = process.env.PORT || 5000;

// Start server (database connection optional for testing)
const startServer = async () => {
  try {
    await connectDB();
    console.log(`✅ MongoDB connected`);
  } catch (error) {
    console.warn(`⚠️  MongoDB connection failed - running in mock mode`);
    console.warn(`   Add MONGODB_URI to .env file to enable database`);
  }
  
  app.listen(PORT, () => {
    console.log(`\n🛡️  LinkShield Backend running on port ${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}/api`);
    console.log(`✅ Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}\n`);
  });
};

startServer();

module.exports = app;
