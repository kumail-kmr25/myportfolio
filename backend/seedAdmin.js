const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const connectDB = require('./src/config/db');

dotenv.config();

const seedAdmin = async () => {
    try {
        await connectDB();

        // Check if admin exists
        const adminExists = await User.findOne({ email: 'admin@kumale.dev' });

        if (adminExists) {
            console.log('⚠️ Admin user already exists');
            process.exit();
        }

        // Create Admin User
        await User.create({
            username: 'admin',
            email: 'admin@kumale.dev',
            password: 'adminpassword123', // Change this in production!
            role: 'admin'
        });

        console.log('✅ Admin user created successfully');
        console.log('📧 Email: admin@kumale.dev');
        console.log('🔑 Password: adminpassword123');
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
