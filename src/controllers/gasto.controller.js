const db = require('../services/db');

async function getGasto(req, res) {
    try {
        const gasto = await db.Gasto.findByPk(req.params.id);
        if (!gasto) {
            return res.status(404).json({ error: 'Gasto not found' });
        }
        res.status(200).json(gasto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getGastos(req, res) {
    try {
        const gastos = await db.Gasto.findAll();
        if (!gastos) {
            return res.status(404).json({ error: 'Gastos not found' });
        }
        res.status(200).json(gastos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createGasto(req, res) {
    try {
        const {
            amount,
            date,
            concept,
            finca,
        } = req.body;

        const gasto = new db.Gasto({
            amount,
            date,
            concept,
            finca,
        });
        if (!gasto) {
            return res.status(404).json({ error: 'Gasto not created' });
        }
        res.status(201).json(gasto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateGasto(req, res) {
    try {
        const gasto = await db.Gasto.findByPk(req.params.id);
        if (!gasto) {
            return res.status(404).json({ error: 'Gasto not found' });
        }
        const {
            amount,
            date,
            concept,
            finca,
        } = req.body;

        gasto.amount = amount;
        gasto.date = date;
        gasto.concept = concept;
        gasto.finca = finca;

        await gasto.save();
        res.status(200).json(gasto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteGasto(req, res) {
    try {
        const gasto = await db.Gasto.findByPk(req.params.id);
        if (!gasto) {
            return res.status(404).json({ error: 'Gasto not found' });
        }
        await gasto.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getGastosByFinca(req, res) {
    try {
        const gastos = await db.Gasto.findAll({
            where: {
                finca: req.params.fincaId
            }
        });
        if (!gastos) {
            return res.status(404).json({ error: 'Gastos not found' });
        }
        res.status(200).json(gastos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getGasto,
    getGastos,
    createGasto,
    updateGasto,
    deleteGasto,
    getGastosByFinca
};