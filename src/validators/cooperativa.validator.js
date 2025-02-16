const Joi = require('joi');
const JoiEntityId = require('./joiValidators');

const validatePostCooperativa = Joi.object({
        name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.min': 'El nombre debe tener al menos 3 caracteres.',
            'string.max': 'El nombre debe tener como máximo 50 caracteres.',
            'any.required': 'El nombre es obligatorio.',
        }),
        email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'El email debe ser un email válido.',
            'any.required': 'El email es obligatorio.',
        }),
        phone: Joi.string()
        .pattern(/^\d{9}$/)
        .required()
        .messages({
            'string.pattern.base': 'El teléfono debe contener exactamente 9 dígitos numéricos.',
            'any.required': 'El teléfono es obligatorio.',
        }),
    });

const validatePutCooperativa = Joi.object({
    name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
        'string.min': 'El nombre debe tener al menos 3 caracteres.',
        'string.max': 'El nombre debe tener como máximo 50 caracteres.',
        'any.required': 'El nombre es obligatorio.',
    }),
    email: Joi.string()
    .email()
    .required()
    .messages({
        'string.email': 'El email debe ser un email válido.',
        'any.required': 'El email es obligatorio.',
    }),
    phone: Joi.string()
    .pattern(/^\d{9}$/)
    .messages({
        'string.pattern.base': 'El teléfono debe contener exactamente 9 dígitos numéricos.',
        'any.required': 'El teléfono es obligatorio.',
    }),
});

module.exports = {
    validatePostCooperativa,
    validatePutCooperativa,
};