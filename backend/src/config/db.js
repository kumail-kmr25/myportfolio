const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

        // Add connection event listeners BEFORE connecting
        mongoose.connection.on('connected', () => {
            console.log('✅ MongoDB connected');
        });

        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️ MongoDB disconnected');
        });

        await mongoose.connect(mongoURI);

        console.log('✅ MongoDB Initial Configuration Complete');
    } catch (error) {
        console.error('❌ MongoDB Initial Connection Error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
