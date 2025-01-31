const db = require('../services/db');

async function getMe(req, res) {
    try {
        const socio = await  db.Socio;findById(req.user.id);

        if (!socio) {
            return res.status(404).json({ message: 'Socio no encontrado' });
        }
        
        res.status(200).json(socio);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function createSocio(req, res) {
    try {
        const {
            name,
            email,
            password,
            rol,
            cooperativa,
            phone,
            mensajes_leidos
        } = req.body;

        const socio = new db.Socio({
            name,
            email,
            password,
            rol,
            cooperativa,
            phone,
            mensajes_leidos
        });

        if (!socio) {
            return res.status(400).json({ message: 'No se pudo crear el socio' });
        }

        res.status(201).json(socio);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateSocio(req, res) {
    try {
        const socio = await db.Socio.findById(req.user.id); //HACER AQUÍ UN FIND UPDATE

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
            mensajes_leidos
        } = req.body;

        socio.name = name;
        socio.email = email;
        socio.password = password;
        socio.rol = rol;
        socio.cooperativa = cooperativa;
        socio.phone = phone;
        socio.mensajes_leidos = mensajes_leidos;

        await socio.save();

        res.status(200).json(socio);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteSocio(req, res) {
    try {
        const socio = await db.Socio.findById(req.user.id);

        if (!socio) {
            return res.status(404).json({ message: 'Socio no encontrado' });
        }

        await db.Socio.deleteOne({ _id: req.user.id });

        res.status(200).json({ message: 'Socio eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getSocios(req, res) {
    try {
        const socios = await db.Socio.find();

        if (!socios) {
            return res.status(404).json({ message: 'No se encontraron socios' });
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
            return res.status(404).json({ message: 'Socio no encontrado' });
        }

        res.status(200).json({ mensajes_leidos: socio.mensajes_leidos });
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
};