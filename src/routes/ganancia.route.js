const {
    createGanancia,
    getGanancias,
    getGanancia,
    updateGanancia,
    deleteGanancia,
    getGananciasByFinca,
} = require('../controllers/ganancia.controller');
const { auth } = require('../middlewares/auth');
const { validateId } = require('../middlewares/validateId');
const { validateNewGanancia, validateUpdateGanancia } = require('../middlewares/validateGanancia');
const router = require('express').Router();

router.post('/', auth, validateNewGanancia, createGanancia);
router.get('/', auth, getGanancias);
router.get('/:id', auth, validateId, getGanancia);
router.patch('/:id', auth, validateId, validateUpdateGanancia, updateGanancia);
router.delete('/:id', auth, validateId, deleteGanancia);
router.get('/finca/:id', auth, validateId, getGananciasByFinca);

module.exports = router;