const Joi = require('joi');

const JoiEntityId =
    Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
           'string.hex': 'The ID must contain only hexadecimal characters.',
            'string.length': 'The ID must be exactly 24 characters long.',
            'any.required': 'The ID field is required.',
        });

        
module.exports = {
    JoiEntityId,
};