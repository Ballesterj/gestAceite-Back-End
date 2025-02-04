const db = require('../services/db');

async function getMensaje(req, res) {
    try {
        const mensaje = await db.Mensaje.findByPk(req.params.id);
        if (!mensaje) {
            return res.status(404).json({ error: 'Mensaje not found' });
        }
        res.status(200).json(mensaje);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getMensajes(req, res) {
    try {
        const mensajes = await db.Mensaje.findAll();
        if (!mensajes) {
            return res.status(404).json({ error: 'Mensajes not found' });
        }
        res.status(200).json(mensajes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createMensaje(req, res) {
    try {
        const {
            message,
            issue,
            coperativa,
        } = req.body;

        const mensaje = new db.Mensaje({
            message,
            issue,
            cooperativa,
        });
        if (!mensaje) {
            return res.status(404).json({ error: 'Mensaje not created' });
        }
        res.status(201).json(mensaje);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateMensaje(req, res) {
    try {
        const mensaje = await db.Mensaje.findByPk(req.params.id);
        if (!mensaje) {
            return res.status(404).json({ error: 'Mensaje not found' });
        }
        const {
            message,
        } = req.body;
        mensaje.message = message;
        await mensaje.save();
        res.status(200).json(mensaje);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteMensaje(req, res) {
    try {
        const mensaje = await db.Mensaje.findByPk(req.params.id);
        if (!mensaje) {
            return res.status(404).json({ error: 'Mensaje not found' });
        }
        await mensaje.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getMensaje,
    getMensajes,
    createMensaje,
    updateMensaje,
    deleteMensaje,
};