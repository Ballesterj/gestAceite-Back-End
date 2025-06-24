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
        const socio = await db.Socio.findById(req.user.id);
        if (!socio) {
            return res.status(404).json({ message: 'Socio no encontrado' });
        }
        const mensajes = await db.Mensaje.find({ cooperativa: socio.cooperativa });
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
        
        const socio = await db.Socio.findById(req.user.id);
        const cooperativa = await db.Cooperativa.findById(socio.cooperativa);

        const mensaje = await db.Mensaje.create({
            message,
            issue,
            cooperativa: cooperativa.id,
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