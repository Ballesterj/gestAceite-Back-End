const Joi = require('joi');

const validatePostGasto = Joi.object({
    amount: Joi.number()
        .min(1)
        .required()
        .messages({
            'number.min': 'The amount must be at least 1.',
            'any.required': 'The amount is required.',
        }),
    date: Joi.date()
        .required()
        .messages({
            'any.required': 'The date is required.',
        }),
    concept: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.min': 'The concept must be at least 3 characters long.',
            'string.max': 'The concept must be at most 50 characters long.',
            'any.required': 'The concept is required.',
        }),
    finca: Joi.string()
        .hex()
        .length(24)
        .messages({
            'string.hex': 'The ID must contain only hexadecimal characters.',
            'string.length': 'The ID must be exactly 24 characters long.',
        }),
});

const validatePutGasto = Joi.object({
    amount: Joi.number()
        .min(1)
        .optional()
        .messages({
            'number.min': 'The amount must be at least 1.',
        }),
    date: Joi.date()
        .optional(),
    concept: Joi.string()
        .min(3)
        .max(50)
        .optional()
        .messages({
            'string.min': 'The concept must be at least 3 characters long.',
            'string.max': 'The concept must be at most 50 characters long.',
        }),
    finca: Joi.string()
        .hex()
        .length(24)
        .messages({
            'string.hex': 'The ID must contain only hexadecimal characters.',
            'string.length': 'The ID must be exactly 24 characters long.',
        }),
});

module.exports = {
    validatePostGasto,
    validatePutGasto,
};
