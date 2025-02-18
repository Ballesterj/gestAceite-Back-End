const {
    createFinca,
    updateFinca,
    deleteFinca,
    getFincas,
    getFinca,
    getFincasSocio,
} = require('../controllers/finca.controller');
const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { validateId } = require('../middlewares/validateId');
const { validateNewFinca, validateUpdateFinca } = require('../middlewares/validateFinca');

router.post('/', auth, validateNewFinca, createFinca);
router.patch('/:id', auth, validateId, validateUpdateFinca, updateFinca);
router.delete('/:id', auth, validateId, deleteFinca);
router.get('/', getFincas);
router.get('/:id', auth, validateId, getFinca);
router.get('/socio/:id', auth, validateId, getFincasSocio);

module.exports = router;