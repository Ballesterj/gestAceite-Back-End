const Joi = require('joi');

const validatePostMensaje = Joi.object({
    issue: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.min': 'The issue must have at least 3 characters.',
            'string.max': 'The issue must have a maximum of 50 characters.',
            'any.required': 'The issue is required.',
        }),
    message: Joi.string()
        .min(3)
        .max(500)
        .required()
        .messages({
            'string.min': 'The message must have at least 3 characters.',
            'string.max': 'The message must have a maximum of 500 characters.',
            'any.required': 'The message is required.',
        }),
});

const validatePutMensaje = Joi.object({
    cooperativa: Joi.string()
        .hex()
        .length(24)
        .messages({
            'string.hex': 'The ID must contain only hexadecimal characters.',
            'string.length': 'The ID must be exactly 24 characters long.',
        }),
    issue: Joi.string()
        .min(3)
        .max(50)
        .messages({
            'string.min': 'The issue must have at least 3 characters.',
            'string.max': 'The issue must have a maximum of 50 characters.',
        }),
    message: Joi.string()
        .min(3)
        .max(500)
        .messages({
            'string.min': 'The message must have at least 3 characters.',
            'string.max': 'The message must have a maximum of 500 characters.',
        }),
});

module.exports = {
    validatePostMensaje,
    validatePutMensaje,
};
