const Joi = require('joi');
const JoiEntityId = require('./joiValidators');

const validateId = validate({
    params: Joi.object({
        id: JoiEntityId,
    }),
});

const validatePostMensaje = validate({
    body: Joi.object({
        cooperativa: JoiEntityId.required(),
        issue: Joi.string().min(3).max(50).required(),
        message: Joi.string().min(3).max(500).required(),
    }),
});

const validatePutMensaje = validate({
    body: Joi.object({
        cooperativa: JoiEntityId,
        issue: Joi.string().min(3).max(50),
        message: Joi.string().min(3).max(500),
    }),
});

module.exports = {
    validatePostMensaje,
    validatePutMensaje,
    validateId,
};

