const {
    createGasto,
    getGastos,
    getGasto,
    updateGasto,
    deleteGasto,
    getGastosByFinca
} = require('../controllers/gasto.controller');
const { auth } = require('../middlewares/auth');
const { validateId } = require('../middlewares/validateId');
const { validateNewGasto, validateUpdateGasto } = require('../middlewares/validateGasto');
const router = require('express').Router();

router.post('/', auth, validateNewGasto, createGasto);
router.get('/', auth, getGastos);
router.get('/:id', auth, validateId, getGasto);
router.patch('/:id', auth, validateId, validateUpdateGasto, updateGasto);
router.delete('/:id', auth, validateId, deleteGasto);
router.get('/finca/:id', auth, validateId, getGastosByFinca);

module.exports = router;