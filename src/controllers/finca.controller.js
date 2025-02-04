const db = require('../services/db');

async function getFinca(req, res) {
    try {
        const finca = await db.Finca.findByPk(req.params.id);
        if (!finca) {
            return res.status(404).json({ error: 'Finca not found' });
        }
        res.status(200).json(finca);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getFincas(req, res) {
    try {
        const fincas = await db.Finca.findAll();
        if (!fincas) {
            return res.status(404).json({ error: 'Fincas not found' });
        }
        res.status(200).json(fincas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createFinca(req, res) {
    try {
        const {
            name,
            location,
            surface,
            oliveAmount,
            owner,
        } = req.body;

        const finca = new db.Finca({
            name,
            location,
            surface,
            oliveAmount,
            owner,
        });
        if (!finca) {
            return res.status(404).json({ error: 'Finca not created' });
        }
        res.status(201).json(finca);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateFinca(req, res) {
    try {
        const finca = await db.Finca.findByPk(req.params.id);
        if (!finca) {
            return res.status(404).json({ error: 'Finca not found' });
        }
        const {
            name,
            location,
            surface,
            oliveAmount,
            owner,
        } = req.body;
        finca.name = name;
        finca.location = location;
        finca.surface = surface;
        finca.oliveAmount = oliveAmount;
        finca.owner = owner;
        await finca.save();
        res.status(200).json(finca);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteFinca(req, res) {
    try {
        const finca = await db.Finca.findByPk(req.params.id);
        if (!finca) {
            return res.status(404).json({ error: 'Finca not found' });
        }
        await finca.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getFincasSocio(req, res) {
    try {
        const fincas = await db.Finca.findAll({
            where: {
                owner: req.params.id,
            },
        });
        if (!fincas) {
            return res.status(404).json({ error: 'No Fincas found' });
        }
        res.status(200).json(fincas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getFinca,
    getFincas,
    createFinca,
    updateFinca,
    deleteFinca,
    getFincasSocio,
};