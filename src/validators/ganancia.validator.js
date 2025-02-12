const Joi = require('joi');
const JoiEntityId = require('./joiValidators');

const validateId = validate({
    params: Joi.object({
        id: JoiEntityId,
    }),
});

const validatePostGanancia = validate({
    body: Joi.object({
        amount: Joi.number().min(0).required(),
        date: Joi.date().required(),
        concept: Joi.string().min(3).max(50).required(),
        finca: JoiEntityId.required(),
    }),
});

const validatePutGanancia = validate({
    body: Joi.object({
        amount: Joi.number().min(0).optional(),
        date: Joi.date().optional(),
        concept: Joi.string().min(3).max(50).optional(),
        finca: JoiEntityId.optional(),
    }),
});

module.exports = {
    validatePostGanancia,
    validatePutGanancia,
    validateId,
};

