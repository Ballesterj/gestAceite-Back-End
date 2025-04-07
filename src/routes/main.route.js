const express = require('express');
const mainController = require('../controllers/main.controller');

const router = express.Router();

router.get('/',
     mainController.getMainPage
);
router.get('/health-check',
     mainController.getHealthCheck
);
router.get('/aceite-precios', mainController.getAceitePrecios);
router.get('/aceite-noticias', mainController.getAceiteNoticias);

module.exports = router;