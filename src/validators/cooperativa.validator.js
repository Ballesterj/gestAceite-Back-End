const Joi = require('joi');
const JoiEntityId = require('./joiValidators');

const validateId = validate({
    params: Joi.object({
        id: JoiEntityId,
    }),
});

const validatePostCooperativa = validate({
    body: Joi.object({
        name: Joi.string().min(3).max(35).required(),
        email: Joi.string().email().required(),
        phone: validateEntityId,
    }),
});

const validatePutCooperativa = validate({
    body: Joi.object({
        name: Joi.string().min(3).max(35),
        email: Joi.string().email(),
        phone: Joi.string()
        .pattern(/^\d{9}$/)
        .messages({
            'string.pattern.base': 'El teléfono debe contener exactamente 9 dígitos numéricos.',
        }),
    }),
});

module.exports = {
    validatePostCooperativa,
    validatePutCooperativa,
};