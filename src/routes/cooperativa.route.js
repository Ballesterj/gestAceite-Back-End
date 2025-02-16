const { 
    createCooperativa,
    updateCooperativa,
    deleteCooperativa,
    getCoopertivas,
    getSocios,
    getCoopertiva,
 } = require('../controllers/cooperativa.controller');

const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { validateId } = require('../middlewares/validateId');
const { validateNewCooperativa, validateUpdateCooperativa } = require('../middlewares/validateCooperativa');


router.post('/', auth, validateNewCooperativa, createCooperativa);
router.patch('/:id', auth, validateId, validateUpdateCooperativa, updateCooperativa);
router.delete('/:id', auth, validateId, deleteCooperativa);
router.get('/', auth, getCoopertivas);
router.get('/socios', auth, getSocios);
router.get('/me', auth, getCoopertiva);

module.exports = router;