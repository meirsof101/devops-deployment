const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb+srv://fidelmwaro:X4jhzHMIlF9IEv16@dev-ops-deployment.2syhmj8.mongodb.net/?retryWrites=true&w=majority&appName=Dev-ops-deployment';
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;