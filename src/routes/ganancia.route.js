const {
    createGanancia,
    getGanancias,
    getGanancia,
    updateGanancia,
    deleteGanancia,
    getGananciasByFinca,
} = require('../controllers/ganancia.controller');

const router = require('express').Router();

router.post('/', createGanancia);
router.get('/', getGanancias);
router.get('/:id', getGanancia);
router.patch('/:id', updateGanancia);
router.delete('/:id', deleteGanancia);
router.get('/finca/:id', getGananciasByFinca);

module.exports = router;