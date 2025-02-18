const db = require('../services/db');
const mongoose = require('mongoose');

async function getMensaje(req, res) {
    try {
        const mensaje = await db.Mensaje.findById(req.params.id);
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
        const mensajes = await db.Mensaje.find();
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
        } = req.body;
        const cooperativa = new mongoose.Types.ObjectId(req.body.cooperativa);

        const mensaje = await db.Mensaje.create({
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
        const { mensajeId } = req.params.id;
        const mensaje = await db.Mensaje.findOne(mensajeId);
        if (!mensaje) {
            return res.status(404).json({ error: 'Mensaje not found' });
        }
        const {
            message,
            issue,
        } = req.body;
        const updateFields = { 
            message: message || mensaje.message,
            issue: issue || mensaje.issue,
        }
        const updatedMensaje = await db.Mensaje.findOneAndUpdate(
            mensajeId,
            updateFields,
            { new: true, runValidators: true, lean: true }
        );
       if (!updatedMensaje) {
           return res.status(400).json({ error: 'Mensaje not updated' });
        }
        res.status(200).json(updateMensaje);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteMensaje(req, res) {
    try {
        const mensajeId = req.params.id;
        const mensaje = await db.Mensaje.findById(mensajeId);
        if (!mensaje) {
            return res.status(404).json({ error: 'Mensaje not found' });
        }
        const deletedMensaje = mensaje;
        await mensaje.deleteOne();
        res.status(200).json(deletedMensaje);
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