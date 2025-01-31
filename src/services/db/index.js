const mongoose = require('mongoose');

require('../db/models/socio');
require('../db/models/finca');
require('../db/models/gasto');
require('../db/models/ganancia');
require('../db/models/cooperativa');
require('../db/models/mensaje');

const Socio = mongoose.model('Socio');
const Finca = mongoose.model('Finca');
const Gasto = mongoose.model('Gasto');
const Ganancia = mongoose.model('Ganancia');
const Cooperativa = mongoose.model('Cooperativa');
const Mensaje = mongoose.model('Mensaje');

const models = {
    Socio,
    Finca,
    Gasto,
    Ganancia,
    Cooperativa,
    Mensaje
};

module.exports = models;