const db = require('../services/db');

async function getCoopertiva(req, res) {
    try {
        const cooperativa = await db.Cooperativa.findByPk(req.params.id);
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
        const cooperativas = await db.Cooperativa.findAll();
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

        const cooperativa = new db.Cooperativa({
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
        const cooperativa = await db.Cooperativa.findByPk(req.params.id);
        if (!cooperativa) {
            return res.status(404).json({ error: 'Cooperativa not found' });
        }
        const {
            name,
            direction,
            city,
            phone,
            email,
        } = req.body;
        cooperativa.name = name;
        cooperativa.direction = direction;
        cooperativa.city = city;
        cooperativa.phone = phone;
        cooperativa.email = email;
        await cooperativa.save();
        res.status(200).json(cooperativa);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteCooperativa(req, res) {
    try {
        const cooperativa = await db.Cooperativa.findByPk(req.params.id);
        if (!cooperativa) {
            return res.status(404).json({ error: 'Cooperativa not found' });
        }
        await cooperativa.destroy();
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