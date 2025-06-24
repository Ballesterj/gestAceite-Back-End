const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: `${__dirname}/env/.env` });
const Cooperativa = require('../services/db/models/cooperativa');
const Socio = require('../services/db/models/socio');
const Finca = require('../services/db/models/finca');

mongoose.connect('mongodb://localhost:27017/gestAceite', {
});

const createData = async () => {
  try {
    await Cooperativa.deleteMany({});
    await Socio.deleteMany({});
    await Finca.deleteMany({});

    // Crear cooperativas
    const cooperativas = await Cooperativa.insertMany([
      { name: 'Picos del Guadiana', direction: 'Calle Sol', city: 'Huesa', phone: '123456789', email: 'coop1@example.com' },
      { name: 'Veleta', direction: 'Calle Guadiana', city: 'Linares', phone: '987654321', email: 'coop2@example.com' }
    ]);

    // Crear socios
    const names = ['Juan', 'Pedro', 'María', 'Ana', 'Luis'];
    const socios = [];
    for (let i = 1; i <= 5; i++) {
      const password = "example";
      const hashPassword = await bcrypt.hash(password, 10);
      const socio = await Socio.create({
        name: `${names[i - 1]}`,
        email: `${names[i - 1]}@example.com`.toLowerCase(),
        password: hashPassword,
        cooperativa: cooperativas[Math.floor(Math.random() * 2)]._id,
        phone: `60000000${i}`
      });
      socios.push(socio);
    }

    // Crear fincas para cada socio
    const fincas = ['Vega', 'La Higuera', 'El Pinar', 'La Encina', 'El Olivar'];
    const ubication = ['Huesa', 'Linares'];
    for (const socio of socios) {
      const numFincas = Math.floor(Math.random() * 4) + 2;
      for (let i = 1; i <= numFincas; i++) {
        await Finca.create({
          name: fincas[Math.floor(Math.random() * fincas.length)],
          location: ubication[Math.floor(Math.random() * ubication.length)],
          surface: Math.floor(Math.random() * 100) + 1,
          oliveAmount: Math.floor(Math.random() * 500) + 50,
          owner: socio._id
        });
      }
    }

    console.log('Base de datos poblada exitosamente.');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error populando la base de datos:', error);
    mongoose.connection.close();
  }
};

createData();
