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

// Graceful shutdown function
const gracefulShutdown = (server) => {
    return () => {
        console.log('🛑 Received kill signal, shutting down gracefully');
        server.close(() => {
            console.log('✅ Closed out remaining connections');
            process.exit(0);
        });

        // Force close if it takes too long
        setTimeout(() => {
            console.error('❌ Could not close connections in time, forcefully shutting down');
            process.exit(1);
        }, 10000);
    };
};

// Start server
const startServer = async () => {
    try {
        await connectDB();

        const server = app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
            console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
        });

        // Handle termination signals
        process.on('SIGTERM', gracefulShutdown(server));
        process.on('SIGINT', gracefulShutdown(server));

    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();

// Handle unhandled promise rejections (Don't crash immediately)
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err.message);
    // console.error(err.stack); // Optional: log stack trace
    // Only exit if critical, otherwise keep running
    // process.exit(1); 
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err.message);
    console.error(err.stack);
    // process.exit(1); // Optional: Restart is usually safer, but for stability we log and monitor
});
