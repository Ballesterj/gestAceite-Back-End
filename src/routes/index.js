const express = require('express');

//Middlewares

//Routes
const mainRouter = require('./main.route');

const router = express.Router();

router.use('/', mainRouter);

module.exports = router;