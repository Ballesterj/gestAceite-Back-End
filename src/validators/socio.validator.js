const Joi = require('joi');
const { JoiEntityId } = require('../helpers/joiValidators');


const verifyId = Joi.object({
    id: JoiEntityId,
});


const validatePostSocio = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.min": "The name must be at least 3 characters long.",
            "string.max": "The name cannot exceed 50 characters.",
            "any.required": "The name field is required.",
            "string.empty": "The name field cannot be empty.",
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Please enter a valid email address.",
            "any.required": "The email field is required.",
            "string.empty": "The email field cannot be empty.",
        }),
    password: Joi.string()
        .min(10)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z]).{10,}$/)
        .required()
        .messages({
            "string.pattern.base":
                "The password must contain at least one uppercase and one lowercase letter.",
            "string.min": "The password must be at least 10 characters long.",
            "any.required": "The password field is required.",
            "string.empty": "The password field cannot be empty.",
        }),
    phone: Joi.string()
        .pattern(/^\d{9}$/)
        .required()
        .messages({
            "string.pattern.base":
                "The phone number must contain exactly 9 numeric digits.",
            "any.required": "The phone field is required.",
            "string.empty": "The phone field cannot be empty.",
        }),
});

const validateUpSocio = Joi.object({
        name: Joi.string()
            .min(3)
            .max(20)
            .messages({
                'string.min': 'The name must have at least 3 characters.',
                'string.max': 'The name cannot exceed 50 characters.',
                'string.empty': 'The name field cannot be empty.',
            }),
        email: Joi.string()
            .email()
            .messages({
                'string.email': 'Please enter a valid email address.',
                'string.empty': 'The email field cannot be empty.',
            }),
        password: Joi.string()
            .min(10)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z]).{10,}$/)
            .messages({
                'string.pattern.base': 'The password must contain at least one uppercase and one lowercase letter.',
                'string.min': 'The password must be at least 10 characters long.',
                'string.empty': 'The password field cannot be empty.',
            }),
        phone: Joi.string()
            .pattern(/^\d{9}$/)
            .messages({
                'string.pattern.base': 'The phone number must contain exactly 9 numeric digits.',
                'string.empty': 'The phone field cannot be empty.',
            }),
    });

module.exports = {
    validatePostSocio,
    validateUpSocio,
    verifyId,
};