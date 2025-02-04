const {
    createFinca,
    updateFinca,
    deleteFinca,
    getFincas,
    getFinca,
    getFincasSocio,
} = require('../controllers/finca.controller');

const router = require('express').Router();

router.post('/', createFinca);
router.patch('/:id', updateFinca);
router.delete('/:id', deleteFinca);
router.get('/', getFincas);
router.get('/:id', getFinca);
router.get('/socio/:id', getFincasSocio);

module.exports = router;