const express = require('express');

//Middlewares

//Routes
const mainRouter = require('./main.route');
const socioRouter = require('./socio');

const router = express.Router();

router.use('/', mainRouter);
router.use('/socio', socioRouter);

module.exports = router;