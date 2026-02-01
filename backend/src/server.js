const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables FIRST
dotenv.config();

const authRoutes = require('./routes/auth');
const testimonialRoutes = require('./routes/testimonials');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://kumailkmr-portfolio.vercel.app',
        'https://www.kumailkmr-portfolio.vercel.app',
        process.env.FRONTEND_URL
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send(`
        <h1>✅ Backend is Running</h1>
        <p>Status: Active</p>
        <p>Port: ${PORT}</p>
        <p>Time: ${new Date().toISOString()}</p>
    `);
});

app.use('/api/auth', authRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Database connection
const connectDB = require('./config/db');

// Start server
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
        console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err.message);
    process.exit(1);
});
