const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        trim: true,
        maxlength: [100, 'Role cannot exceed 100 characters'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^[0-9+\-\s()]{10,20}$/, 'Please fill a valid phone number'],
    },
    image: {
        type: String, // Gravatar URL
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        maxlength: [500, 'Message cannot exceed 500 characters'],
    },
    rating: {
        type: Number,
        required: true,
        default: 5,
        min: 1,
        max: 5,
    },
    approved: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
