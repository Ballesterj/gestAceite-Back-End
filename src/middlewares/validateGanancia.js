const { validatePostGanancia, validatePutGanancia } = require("../validators/ganancia.validator");

function validateNewGanancia(req, res, next) {
    const { error } = validatePostGanancia.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

function validateUpdateGanancia(req, res, next) {
    const { error } = validatePutGanancia.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

module.exports = {
    validateNewGanancia,
    validateUpdateGanancia,
};
