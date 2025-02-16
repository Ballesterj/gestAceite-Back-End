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
const { validateId } = require('../middlewares/validateId');
const { validateNewSocio, validateUpdateSocio } = require('../middlewares/validateSocio');
const router = require('express').Router();

router.post('/', validateNewSocio, createSocio);
router.patch('/:id', validateId, validateUpdateSocio, auth, updateSocio);
router.delete('/:id', validateId, auth, deleteSocio);
router.get('/', auth, getSocios);
router.get('/messages',  auth, getReadsMessages);
router.get('/me', auth, getMe);
router.post('/login', login);


module.exports = router;