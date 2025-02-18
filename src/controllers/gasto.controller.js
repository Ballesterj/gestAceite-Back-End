const db = require('../services/db');
const mongoose = require('mongoose');
const finca = require('../services/db/models/finca');

async function getGasto(req, res) {
    try {
        const gasto = await db.Gasto.findById(req.params.id);
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
        const gastos = await db.Gasto.find();
        if (!gastos) {
            return res.status(404).json({ error: 'No gastos found' });
        }
        res.status(200).json(gastos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createGasto(req, res) {
    try {
        const { amount, date, concept, finca } = req.body;
        const fincaId = new mongoose.Types.ObjectId(finca);

        const gasto = await db.Gasto.create({
            amount,
            date,
            concept,
            finca: fincaId,
        });

        if (!gasto) {
            return res.status(400).json({ error: 'Gasto not created' });
        }
        res.status(201).json(gasto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateGasto(req, res) {
    try {
        const { id } = req.params;
        const gasto = await db.Gasto.findById(id);

        if (!gasto) {
            return res.status(404).json({ error: 'Gasto not found' });
        }

        const { amount, date, concept, finca } = req.body;

        const updateFields = {
            amount: amount || gasto.amount,
            date: date || gasto.date,
            concept: concept || gasto.concept,
            finca: finca || gasto.finca,
        };

        const updatedGasto = await db.Gasto.findByIdAndUpdate(
            id,
            updateFields,
            { new: true, runValidators: true, lean: true }
        );

        if (!updatedGasto) {
            return res.status(400).json({ error: 'Gasto not updated' });
        }

        res.status(200).json(updatedGasto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteGasto(req, res) {
    try {
        const { id } = req.params;
        const gasto = await db.Gasto.findById(id);

        if (!gasto) {
            return res.status(404).json({ error: 'Gasto not found' });
        }
        const deletedGasto = gasto;
        await gasto.deleteOne();
        res.status(200).json(deletedGasto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getGastosByFinca(req, res) {
    try {
        const { fincaId } = req.params.id;
        const gastos = await db.Gasto.find(fincaId);
        if (!gastos || gastos.length === 0) {
            return res.status(404).json({ error: 'No gastos found for this Finca' });
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
    getGastosByFinca,
};