const Joi = require('joi');
const JoiEntityId = require('./joiValidators');

const validateId = validate({
    params: Joi.object({
        id: JoiEntityId,
    }),
});

const validatePostGasto = validate({
    body: Joi.object({
        amount: Joi.number().min(0).required(),
        date: Joi.date().required(),
        concept: Joi.string().min(3).max(50).required(),
        finca: JoiEntityId.required(),
    }),
});

const validatePutGasto = validate({
    body: Joi.object({
        amount: Joi.number().min(0).optional(),
        date: Joi.date().optional(),
        concept: Joi.string().min(3).max(50).optional(),
        finca: JoiEntityId.optional(),
    }),
});

module.exports = {
    validatePostGasto,
    validatePutGasto,
    validateId,
};