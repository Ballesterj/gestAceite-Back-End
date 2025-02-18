const { validatePostMensaje, validatePutMensaje } = require('../validators/mensaje.validator');

function validateNewMensaje(req, res, next) {
    const { error } = validatePostMensaje.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

function validateUpdateMensaje(req, res, next) {
    const { error } = validatePutMensaje.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

module.exports = {
    validateNewMensaje,
    validateUpdateMensaje,
};
