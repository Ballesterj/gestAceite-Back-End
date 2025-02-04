const {
    createGasto,
    getGastos,
    getGasto,
    updateGasto,
    deleteGasto,
    getGastosByFinca
} = require('../controllers/gasto.controller');

const router = require('express').Router();

router.post('/', createGasto);
router.get('/', getGastos);
router.get('/:id', getGasto);
router.patch('/:id', updateGasto);
router.delete('/:id', deleteGasto);
router.get('/finca/:id', getGastosByFinca);

module.exports = router;