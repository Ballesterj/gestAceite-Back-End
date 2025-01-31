const { mongoose } = require('mongoose');

const url = 'mongodb://localhost:27017';
const dbName = '/gestAceite';
let dbConnection = null;
// Models
require('../db/models/socio');
require('../db/models/finca');
require('../db/models/gasto');
require('../db/models/ganancia');
require('../db/models/cooperativa');
require('../db/models/mensaje');

async function connectDB() {
  if (dbConnection) {
    console.log('Ya estás conectado a MongoDB');
    return dbConnection;
  }

  try {

    await mongoose.connect(url+dbName, {});
    dbConnection = mongoose.connection;

    return dbConnection;
  } catch (err) {
    console.error('Error al conectar a MongoDB', err);
    throw err;
  }
}

function getDB() {
  if (!dbConnection) {
    throw new Error('No estás conectado a la base de datos');
  }
  return dbConnection;
}

module.exports = { connectDB, getDB };
