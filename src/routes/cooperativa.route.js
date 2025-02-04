const { 
    createCooperativa,
    updateCooperativa,
    deleteCooperativa,
    getCoopertivas,
    getSocios,
    getCoopertiva,
 } = require('../controllers/cooperativa.controller');

const router = require('express').Router();

router.post('/', createCooperativa);
router.patch('/:id', updateCooperativa);
router.delete('/:id', deleteCooperativa);
router.get('/', getCoopertivas);
router.get('/socios', getSocios);
router.get('/me', getCoopertiva);

module.exports = router;