const db = require('../services/db');

async function getCoopertiva(req, res) {
    try {
        const cooperativa = await db.Cooperativa.findById(req.params.id);
        if (!cooperativa) {
            return res.status(404).json({ error: 'Cooperativa not found' });
        }
        res.status(200).json(cooperativa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getCoopertivas(req, res) {
    try {
        const cooperativas = await db.Cooperativa.find();
        if (!cooperativas) {
            return res.status(404).json({ error: 'Cooperativas not found' });
        }
        res.status(200).json(cooperativas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createCooperativa(req, res) {
    try {
        const {
            name,
            direction,
            city,
            phone,
            email,
        } = req.body;

        const cooperativa = await db.Cooperativa.create({
            name,
            direction,
            city,
            phone,
            email,
        });
        if (!cooperativa) {
            return res.status(404).json({ error: 'Cooperativa not created' });
        }
        res.status(201).json(cooperativa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateCooperativa(req, res) {
    try {
        const { cooperativaId } = req.params;
        const cooperativa = await db.Cooperativa.findOne(cooperativaId);
        if (!cooperativa) {
            return res.status(404).json({ error: 'Cooperativa not found' });
        }
        //FALTA PRESIDENTE
        const {
            name,
            direction,
            city,
            phone,
            email,
        } = req.body;
        
        const updateFields = {
            name: name || cooperativa.name,
            direction: direction || cooperativa.direction,
            city: city || cooperativa.city,
            phone: phone || cooperativa.phone,
            email: email || cooperativa.email,
        };
        
        const updatedCooperativa = await cooperativa.findOneAndUpdate(
            cooperativaId,
            updateFields,
            { new: true }, { runValidators: true }, { lean: true }
        );

        if (!updatedCooperativa) {
            return res.status(400).json({ error: 'Cooperativa not updated' });
        }
        res.status(200).json(updatedCooperativa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteCooperativa(req, res) {
    try {
        const cooperativaId = req.params;
        const cooperativa = await db.Cooperativa.findById(cooperativaId.id);
        if (!cooperativa) {
            return res.status(404).json({ error: 'Cooperativa not found' });
        }
        const deletedCooperativa = await cooperativa.deleteOne(cooperativaId);
        if (!deletedCooperativa) {
            return res.status(400).json({ error: 'Cooperativa not deleted' });
        }
        res.status(200).json({ message: 'Cooperativa deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getSocios(req, res) {
    try {
        const socios = await db.Socio.findAll({ cooperativa: req.params.id });
        if (!socios.length) {
            return res.status(404).json({ error: 'Socios not found' });
        }
        res.status(200).json(socios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getCoopertiva,
    getCoopertivas,
    createCooperativa,
    updateCooperativa,
    deleteCooperativa,
    getSocios,
};