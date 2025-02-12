const { 
    createSocio,
    updateSocio,
    deleteSocio,
    getSocios,
    getReadsMessages,
    getMe,
    login,
 } = require('../controllers/socio.controller');
const { auth } = require('../middlewares/auth');
const { validateId, validatePostSocio, validateUpdateSocio } = require('../validators/socio.validator');
const { validate } = require('express-validation');

const router = require('express').Router();

router.post('/', validate(validatePostSocio), createSocio);
router.patch('/:id', validate(validateId), validate(validateUpdateSocio), auth, updateSocio);
router.delete('/:id', validate(validateId), auth, deleteSocio);
router.get('/',  auth, getSocios);
router.get('/messages',  auth, getReadsMessages);
router.get('/me', auth, getMe);
router.post('/login', login);


module.exports = router;