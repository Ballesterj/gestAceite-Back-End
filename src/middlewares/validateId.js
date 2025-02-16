const { verifyId } = require('../validators/socio.validator');

function validateId(req, res, next) {
    const { error } = verifyId.validate(req.params); 
    if (error) {
        return res.status(400).json(error);
    }
    next();
}

module.exports = { 
    validateId 
};
