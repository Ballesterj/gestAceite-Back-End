const db = require('../services/db');
const bcrypt = require('bcrypt');
const { dataEncode } = require('../helpers/jwt.helper');
require('dotenv').config({ path: `${__dirname}/env/.env` });

async function login(req, res) {
    const { email, password } = req.body;
  
    try {
        const user = await db.Socio.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'Socio not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
  
      const token = dataEncode({ id: user.id, email: user.email });
      res.status(200).json({ message: 'Login successful', token });
  
    } catch (error) {
      res.status(500).json({ message: 'Login error', error: error.message });
    }
  }

async function getMe(req, res) {
    try {
        const socio = await  db.Socio.findById(req.user.id);

        if (!socio) {
            return res.status(404).json({ message: 'Socio no encontrado' });
        }

        const socioResponse = socio.toObject();
        delete socioResponse.password;
        const cooperativa = await db.Cooperativa.findById(socio.cooperativa);
        socioResponse.cooperativa = cooperativa ? cooperativa.name : null;
        res.status(200).json(socioResponse);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function createSocio(req, res) {
    try {
        const { name, email, password, rol, cooperativa, phone, mensajes_leidos } = req.body;

        const userExists = await db.Socio.findOne({ email });        
        if (userExists) {
            return res.status(400).json({ message: 'The user already exists' });
        }

        if (rol === "admin") {
            const adminExists = await db.Socio.findOne({ cooperativa, rol: "admin" });
            if (adminExists) {
                return res.status(400).json({ message: 'An administrator already exists for this cooperative' });
            }
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
        const hashPassword = await bcrypt.hash(password, saltRounds);
        
        const socio = await db.Socio.create({
            name,
            email,
            password: hashPassword,
            rol,
            cooperativa,
            phone,
            mensajes_leidos
        });

        const socioResponse = socio.toObject();
        delete socioResponse.password;
        res.status(201).json(socioResponse);   
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateSocio(req, res) {
    try {
        const { id } = req.params;
        const socio = await db.Socio.findById(id);
        if (!socio) {
            return res.status(404).json({ message: 'Socio no encontrado' });
        }

        const {
            name,
            email,
            password,
            rol,
            cooperativa,
            phone,
        } = req.body;

        let hashPassword = socio.password;

        if (password) {
            const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
            hashPassword = await bcrypt.hash(password, saltRounds);
        }

        const updateFields = {
            name: name || socio.name,
            email: email || socio.email,
            password: hashPassword || socio.password,
            rol: rol || socio.rol,
            cooperativa: cooperativa || socio.cooperativa,
            phone: phone || socio.phone,
        }

       const updatedSocio = await db.Socio.findOneAndUpdate(
        { _id: id}, 
        updateFields, 
        { new: true, runValidators: true, lean: true },
       );

       if(!updatedSocio) {
            return res.status(400).json({ message: 'Error updating user' });
       }

        res.status(200).json(updatedSocio);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteSocio(req, res) {
    try {
        const socio = await db.Socio.findById(req.user.id);

        if (!socio) {
            return res.status(404).json({ message: 'Socio not found' });
        }

        await db.Socio.deleteOne({ _id: req.user.id });

        res.status(200).json({ message: 'Socio deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getSocios(req, res) {
    try {
        const socios = await db.Socio.find();

        if (!socios) {
            return res.status(404).json({ message: 'Socios not found' });
        }

        res.status(200).json(socios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getReadsMessages(req, res) {
    try {
        const socio = await db.Socio.findById(req.user.id);

        if (!socio) {
            return res.status(404).json({ message: 'Socio not found' });
        }

        res.status(200).json({ mensajes_leidos: socio.mensajes_leidos });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }   
}

async function putPresident(req, res) {
    try {
        const { id } = req.params;
        const socio = await db.Socio.findById(id);
        if (!socio) {
            return res.status(404).json({ message: 'Socio not found' });
        }

        const presidentExists = await db.Socio.findOne({ 
            president: true,
            cooperativa: socio.cooperativa,
        });

        if (presidentExists) {
            return res.status(400).json({ message: 'There is already a president for this cooperative' });
        }

        socio.president = true;
        const updatedSocio = await socio.save();

        res.status(200).json(updatedSocio);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getMe,
    createSocio,
    updateSocio,
    deleteSocio,
    getSocios,
    getReadsMessages,
    login,
    putPresident,
};