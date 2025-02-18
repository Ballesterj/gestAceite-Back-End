const Joi = require('joi');

const validatePostGanancia = Joi.object({
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
        degrees: Joi.number()
            .min(1)
            .max(100)
            .required()
            .messages({
                'any.required': 'The degrees field is required.',
            }),
        kilos: Joi.number()
            .required()
            .messages({
                'any.required': 'The kilos field is required.',
            }),
});

const validatePutGanancia = Joi.object({
        amount: Joi.number()
            .min(1)
            .optional()
            .messages({
                'number.min': 'The amount must be at least 1.',
            }),
        date: Joi.date()
            .optional()
            .messages({
                'date.base': 'The date must be a valid date.',
            }),
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
        degrees: Joi.number()
            .optional()
            .messages({
                'number.base': 'The degrees field must be a number.',
            }),
        kilos: Joi.number()
            .optional()
            .messages({
                'number.base': 'The kilos field must be a number.',
            }),
});

module.exports = {
    validatePostGanancia,
    validatePutGanancia,
};
