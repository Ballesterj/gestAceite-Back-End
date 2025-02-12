const Joi = require('joi');

const JoiEntityId =
    Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            'string.hex': 'El ID de socio debe contener solo caracteres hexadecimales.',
            'string.length': 'El ID de socio debe tener exactamente 24 caracteres.',
        });

        
module.exports = {
    JoiEntityId,
};