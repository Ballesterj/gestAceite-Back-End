const mongoose = require('mongoose');

require('../db/models/socio');
require('../db/models/finca');
require('../db/models/cooperativa');
require('../db/models/mensaje');

const Socio = mongoose.model('Socio');
const Finca = mongoose.model('Finca');
const Cooperativa = mongoose.model('Cooperativa');
const Mensaje = mongoose.model('Mensaje');

const models = {
    Socio,
    Finca,
    Cooperativa,
    Mensaje
};

module.exports = models;