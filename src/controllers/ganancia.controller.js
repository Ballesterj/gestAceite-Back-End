const db = require('../services/db');
const mongoose = require('mongoose');

async function getGanancia(req, res) {
    try {
        const ganancia = await db.Ganancia.findById(req.params.id);
        if (!ganancia) {
            return res.status(404).json({ error: 'Ganancia not found' });
        }
        res.status(200).json(ganancia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getGanancias(req, res) {
    try {
        const ganancias = await db.Ganancia.find();
        if (!ganancias) {
            return res.status(404).json({ error: 'Ganancias not found' });
        }
        res.status(200).json(ganancias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createGanancia(req, res) {
    try {
        const {
            amount,
            date,
            concept,
            kilos,
            degrees,
        } = req.body;
        const finca = new mongoose.Types.ObjectId(req.body.finca);
        
        const ganancia = await db.Ganancia.create({
            amount,
            date,
            concept,
            finca,
            kilos,
            degrees,
        });
        if (!ganancia) {
            return res.status(404).json({ error: 'Ganancia not created' });
        }
        res.status(201).json(ganancia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateGanancia(req, res) {
    try {
        const { gananciaId } = req.params;
        const ganancia = await db.Ganancia.findOne(gananciaId);

        if (!ganancia) {
            return res.status(404).json({ error: 'Ganancia not found' });
        }
        const {
            amount,
            date,
            concept,
            finca,
            kilos,
            degrees,
        } = req.body;
        const updateFields = {
            amount: amount || ganancia.amount,
            date: date || ganancia.date,
            finca: finca || ganancia.finca,
            concept: concept || ganancia.concept,
            kilos: kilos || ganancia.kilos,
            degrees: degrees || ganancia.degrees,
        };
        const updatedGanancia = await db.Ganancia.findOneAndUpdate(
            gananciaId,
            updateFields,
            { new: true, runValidators: true, lean: true }
        );

        if (!updatedGanancia) {
            return res.status(404).json({ error: 'Ganancia not updated' });
        }

        res.status(200).json(updatedGanancia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteGanancia(req, res) {
    try {
        const fincaId = req.params.id;
        const ganancia = await db.Ganancia.findById(fincaId);
        if (!ganancia) {
            return res.status(404).json({ error: 'Ganancia not found' });
        }
        const deletedGanancia = ganancia;
        await ganancia.deleteOne();
        res.status(200).json(deletedGanancia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getGananciasByFinca(req, res) {
    try {
        const { fincaId } = req.params.id;
        const ganancias = await db.Ganancia.find(fincaId);
        if (!ganancias || ganancias.length === 0) {
            return res.status(404).json({ error: 'Ganancias not found for this Finca' });
        }
        res.status(200).json(ganancias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createGanancia,
    getGanancias,
    getGanancia,
    updateGanancia,
    deleteGanancia,
    getGananciasByFinca,
};