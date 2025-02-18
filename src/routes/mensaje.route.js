const {
    getMensaje,
    getMensajes,
    createMensaje,
    updateMensaje,
    deleteMensaje,
} = require('../controllers/mensaje.controller');
const { auth } = require('../middlewares/auth');
const { validateId } = require('../middlewares/validateId');
const { validateNewMensaje, validateUpdateMensaje } = require('../middlewares/validateMensaje');
const router = require('express').Router();

router.get('/:id', auth, validateId, getMensaje);
router.get('/', auth, getMensajes);
router.post('/', auth, validateNewMensaje, createMensaje);
router.patch('/:id', auth, validateId,  validateUpdateMensaje, updateMensaje);
router.delete('/:id', auth, validateId, deleteMensaje);

module.exports = router;