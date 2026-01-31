const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { testimonialValidationRules, validate } = require('../middleware/validation');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/testimonials
// @desc    Get all approved testimonials
// @access  Public
router.get('/', async (req, res, next) => {
    try {
        const testimonials = await Testimonial.find({ approved: true })
            .sort({ createdAt: -1 })
            .select('-__v');

        res.status(200).json(testimonials);
    } catch (error) {
        next(error);
    }
});

// @route   POST /api/testimonials
// @desc    Submit a new testimonial
// @access  Public
router.post('/', testimonialValidationRules(), validate, async (req, res, next) => {
    try {
        const { name, email, phone, role, message, rating } = req.body;

        const image = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

        const testimonial = await Testimonial.create({
            name,
            email,
            phone,
            role,
            message,
            rating,
            image,
            approved: false, // Must be approved by admin
        });

        res.status(201).json({
            success: true,
            message: 'Testimonial submitted successfully! It will be visible after admin approval.',
            data: testimonial,
        });
    } catch (error) {
        next(error);
    }
});

// @route   GET /api/testimonials/all
// @desc    Get all testimonials (including pending) - Admin only
// @access  Admin
router.get('/all', protect, admin, async (req, res, next) => {
    try {
        const testimonials = await Testimonial.find()
            .sort({ createdAt: -1 })
            .select('-__v');

        res.status(200).json(testimonials);
    } catch (error) {
        next(error);
    }
});

// @route   PATCH /api/testimonials/:id/approve
// @desc    Approve a testimonial - Admin only
// @access  Admin
router.patch('/:id/approve', protect, admin, async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            { approved: true },
            { new: true, runValidators: true }
        );

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Testimonial approved successfully',
            data: testimonial,
        });
    } catch (error) {
        next(error);
    }
});

// @route   DELETE /api/testimonials/:id
// @desc    Delete a testimonial - Admin only
// @access  Admin
router.delete('/:id', protect, admin, async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

        if (!testimonial) {
            return res.status(404).json({
                success: false,
                message: 'Testimonial not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Testimonial deleted successfully',
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
