const { body, validationResult } = require('express-validator');

// Validation rules for testimonial submission
const testimonialValidationRules = () => {
    return [
        body('name')
            .trim()
            .notEmpty()
            .withMessage('Name is required')
            .isLength({ max: 100 })
            .withMessage('Name cannot exceed 100 characters')
            .escape(),
        body('role')
            .trim()
            .notEmpty()
            .withMessage('Role is required')
            .isLength({ max: 100 })
            .withMessage('Role cannot exceed 100 characters')
            .escape(),
        body('phone')
            .trim()
            .notEmpty()
            .withMessage('Phone number is required')
            .matches(/^[0-9+\-\s()]{10,20}$/)
            .withMessage('Please include a valid phone number')
            .escape(),
        body('message')
            .trim()
            .notEmpty()
            .withMessage('Message is required')
            .isLength({ max: 500 })
            .withMessage('Message cannot exceed 500 characters')
            .escape(),
    ];
};

// Middleware to check validation results
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array(),
        });
    }
    next();
};

module.exports = {
    testimonialValidationRules,
    validate,
};
