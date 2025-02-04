const {
    getMensaje,
    getMensajes,
    createMensaje,
    updateMensaje,
    deleteMensaje,
} = require('../controllers/mensaje.controller');

const router = require('express').Router();

router.get('/:id', getMensaje);
router.get('/', getMensajes);
router.post('/', createMensaje);
router.patch('/:id', updateMensaje);
router.delete('/:id', deleteMensaje);

module.exports = router;