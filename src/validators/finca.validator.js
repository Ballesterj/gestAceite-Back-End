const Joi = require('joi');
const { JoiEntityId } = require('../helpers/joiValidators');

const validatePostFinca = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        'string.min': 'The name must be at least 3 characters long.',
        'string.max': 'The name cannot exceed 50 characters.',
        'any.required': 'The name field is required.',
    }),
    surface: Joi.number().min(1).required().messages({
        'number.min': 'The surface must be at least 1.',
        'any.required': 'The surface field is required.',
    }),
    location: Joi.string().min(3).max(50).required().messages({
        'string.min': 'The location must be at least 3 characters long.',
        'string.max': 'The location cannot exceed 50 characters.',
        'any.required': 'The location field is required.',
    }),
    oliveAmount: Joi.number().min(1).required().messages({
        'number.min': 'The olive amount must be at least 1.',
        'any.required': 'The olive amount field is required.',
    }),
    owner: Joi.string()
            .hex()
            .length(24)
            .messages({
               'string.hex': 'The ID must contain only hexadecimal characters.',
                'string.length': 'The ID must be exactly 24 characters long.',
            }),
});

const validatePutFinca = Joi.object({
    name: Joi.string().min(3).max(50).messages({
        'string.min': 'The name must be at least 3 characters long.',
        'string.max': 'The name cannot exceed 50 characters.',
    }),
    surface: Joi.number().min(1).messages({
        'number.min': 'The surface must be at least 1.',
    }),
    location: Joi.string().min(3).max(50).messages({
        'string.min': 'The location must be at least 3 characters long.',
        'string.max': 'The location cannot exceed 50 characters.',
    }),
    oliveAmount: Joi.number().min(1).messages({
        'number.min': 'The olive amount must be at least 1.',
    }),
    owner: Joi.string()
    .hex()
    .length(24)
    .messages({
       'string.hex': 'The ID must contain only hexadecimal characters.',
        'string.length': 'The ID must be exactly 24 characters long.',
    }),
});

module.exports = {
    validatePostFinca,
    validatePutFinca,
};


module.exports = {
    validatePostFinca,
    validatePutFinca,
};