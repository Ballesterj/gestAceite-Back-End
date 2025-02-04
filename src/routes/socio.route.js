const { 
    createSocio,
    updateSocio,
    deleteSocio,
    getSocios,
    getReadsMessages,
    getMe,
 } = require('../controllers/socio.controller');

const router = require('express').Router();

router.post('/', createSocio);
router.patch('/:id', updateSocio);
router.delete('/:id', deleteSocio);
router.get('/', getSocios);
router.get('/messages', getReadsMessages);
router.get('/me', getMe);

module.exports = router;