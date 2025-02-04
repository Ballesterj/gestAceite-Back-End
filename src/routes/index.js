const express = require('express');

//Middlewares

//Routes
const mainRouter = require('./main.route');
const socioRouter = require('./socio.route');
const cooperativaRouter = require('./cooperativa.route');
const fincaRouter = require('./finca.route');
const gananciaRouter = require('./ganancia.route');
const gastoRouter = require('./gasto.route');
const mensajeRouter = require('./mensaje.route');

const router = express.Router();

router.use('/', mainRouter);
router.use('/socio', socioRouter);
router.use('/cooperativa', cooperativaRouter);
router.use('/finca', fincaRouter);
router.use('/ganancia', gananciaRouter);
router.use('/gasto', gastoRouter);
router.use('/mensaje', mensajeRouter);

module.exports = router;