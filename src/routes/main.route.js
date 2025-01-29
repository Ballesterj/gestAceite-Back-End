const express = require('express');
const mainController = require('../controllers/main.controller');

const router = express.Router();

router.get('/',
     mainController.getMainPage
);

module.exports = router;