const mongoose = require('mongoose');
const Testimonial = require('./src/models/Testimonial');
require('dotenv').config();

const sampleTestimonials = [
    {
        name: 'Sarah Johnson',
        role: 'CEO at TechStart Inc',
        message: 'Working with Kumale was an absolute pleasure! He delivered a full-stack solution that exceeded our expectations. His attention to detail and expertise in both frontend and backend development made our project a huge success.',
        approved: true,
    },
    {
        name: 'Michael Chen',
        role: 'Product Manager at Digital Solutions',
        message: 'Kumale\'s DevOps skills are outstanding. He set up our entire CI/CD pipeline and Docker infrastructure, making our deployment process seamless. Highly recommend his services!',
        approved: true,
    },
    {
        name: 'Emily Rodriguez',
        role: 'Startup Founder',
        message: 'The portfolio website Kumale built for us was exactly what we needed. Modern design, fast loading times, and perfect responsiveness across all devices. A true professional!',
        approved: true,
    },
    {
        name: 'David Thompson',
        role: 'CTO at CloudBase',
        message: 'Kumale\'s expertise in the MERN stack is impressive. He built our entire admin dashboard with beautiful animations and a great user experience. The code quality was exceptional.',
        approved: true,
    },
    {
        name: 'Lisa Wang',
        role: 'Designer at Creative Agency',
        message: 'As a designer, I appreciate developers who can bring designs to life perfectly. Kumale did exactly that with pixel-perfect implementation and smooth animations using Framer Motion.',
        approved: true,
    },
];

const seedDatabase = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

        await mongoose.connect(mongoURI);

        console.log('✅ MongoDB connected successfully');

        // Clear existing testimonials
        await Testimonial.deleteMany({});
        console.log('🗑️  Cleared existing testimonials');

        // Insert sample testimonials
        await Testimonial.insertMany(sampleTestimonials);
        console.log(`✅ Inserted ${sampleTestimonials.length} sample testimonials`);

        console.log('✨ Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        process.exit(1);
    }
};

seedDatabase();
