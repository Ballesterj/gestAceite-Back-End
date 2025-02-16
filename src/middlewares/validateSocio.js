const { validatePostSocio, validateUpSocio } = require('../validators/socio.validator');

function validateNewSocio(req, res, next) {
    const { error } = validatePostSocio.validate(req.body);
    if (error) {
        return res.status(400).json(error);
    }
    next();
}

function validateUpdateSocio(req, res, next) {
    const { error } = validateUpSocio.validate(req.body);
    if (error) {
        return res.status(400).json(error);
    }
    next();
}

module.exports = {
    validateNewSocio,
    validateUpdateSocio
};