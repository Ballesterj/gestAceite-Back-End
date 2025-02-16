const { validatePostFinca, validatePutFinca } = require("../validators/finca.validator");

function validateNewFinca(req, res, next) {
    const { error } = validatePostFinca.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

function validateUpdateFinca(req, res, next) {
    const { error } = validatePutFinca.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

module.exports = {
    validateNewFinca,
    validateUpdateFinca,
};
