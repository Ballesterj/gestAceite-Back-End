const Joi = require('joi');
const JoiEntityId = require('./joiValidators');

const validateId = validate({
    params: Joi.object({
        id: JoiEntityId,
    }),
});

const validatePostFinca = validate({
    body: Joi.object({
        name: Joi.string().min(3).max(50).required(),
        surface: Joi.number().min(1).required(),
        location: Joi.string().min(3).max(50).required(),
        oliveAmount: Joi.string().min(3).max(50).required(),
        owner: JoiEntityId,
    }),
});

const validatePutFinca = validate({
    body: Joi.object({
        name: Joi.string().min(3).max(50),
        surface: Joi.number().min(1),
        location: Joi.string().min(3).max(50),
        oliveAmount: Joi.number().min(1),
        owner: JoiEntityId,
    }),
});

module.exports = {
    validatePostFinca,
    validatePutFinca,
    validateId,
};