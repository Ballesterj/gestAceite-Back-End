const { validatePostCooperativa, validatePutCooperativa } = require('../validators/cooperativa.validator');

function validateNewCooperativa(req, res, next) {
    const { error } = validatePostCooperativa.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

function validateUpdateCooperativa(req, res, next) {
    const { error } = validatePutCooperativa.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

module.exports = {
    validateNewCooperativa,
    validateUpdateCooperativa,
};  