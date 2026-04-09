const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('username:password')) {
      console.warn('⚠️  MONGODB_URI not configured. Running in demo mode.');
      return null;
    }
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`⚠️  MongoDB Error: ${error.message}`);
    console.warn('   Running in demo mode without database');
    return null;
  }
};

module.exports = connectDB;
