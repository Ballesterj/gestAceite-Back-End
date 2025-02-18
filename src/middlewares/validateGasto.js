const { validatePostGasto, validatePutGasto } = require("../validators/gasto.validator");

function validateNewGasto(req, res, next) {
    const { error } = validatePostGasto.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

function validateUpdateGasto(req, res, next) {
    const { error } = validatePutGasto.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

module.exports = {
    validateNewGasto,
    validateUpdateGasto,
};
