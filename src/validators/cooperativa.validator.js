const Joi = require('joi');

const validatePostCooperativa = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.min': 'The name must be at least 3 characters long.',
            'string.max': 'The name must be at most 50 characters long.',
            'any.required': 'The name is required.',
        }),
    direction: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.min': 'The address must be at least 3 characters long.',
            'string.max': 'The address must be at most 50 characters long.',
            'any.required': 'The address is required.',
        }),
    city: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.min': 'The city must be at least 3 characters long.',
            'string.max': 'The city must be at most 50 characters long.',
            'any.required': 'The city is required.',
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'The email must be a valid email address.',
            'any.required': 'The email is required.',
        }),
    phone: Joi.string()
        .pattern(/^\d{9}$/)
        .required()
        .messages({
            'string.pattern.base': 'The phone number must contain exactly 9 numeric digits.',
            'any.required': 'The phone number is required.',
        }),
});

const validatePutCooperativa = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .messages({
            'string.min': 'The name must be at least 3 characters long.',
            'string.max': 'The name must be at most 50 characters long.',
        }),
    direction: Joi.string()
        .min(3)
        .max(50)
        .messages({
            'string.min': 'The address must be at least 3 characters long.',
            'string.max': 'The address must be at most 50 characters long.',
        }),
    city: Joi.string()
        .min(3)
        .max(50)
        .messages({
            'string.min': 'The city must be at least 3 characters long.',
            'string.max': 'The city must be at most 50 characters long.',
        }),
    email: Joi.string()
        .email()
        .messages({
            'string.email': 'The email must be a valid email address.',
        }),
    phone: Joi.string()
        .pattern(/^\d{9}$/)
        .messages({
            'string.pattern.base': 'The phone number must contain exactly 9 numeric digits.',
        }),
});

module.exports = {
    validatePostCooperativa,
    validatePutCooperativa,
};
