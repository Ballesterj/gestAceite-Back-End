const { mongoose } = require('mongoose');
require('dotenv').config({ path: `${__dirname}/env/.env` });
let dbConnection = null;
// Models
require('../db/models/socio');
require('../db/models/finca');
require('../db/models/cooperativa');
require('../db/models/mensaje');

async function connectDB() {
  if (dbConnection) {
    console.log('Ya estás conectado a MongoDB');
    return dbConnection;
  }

  try {

    await mongoose.connect(process.env.DATABASE_URL, {});
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
