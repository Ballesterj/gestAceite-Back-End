const db = require('../services/db');

async function getGanancia(req, res) {
    try {
        const ganancia = await db.Ganancia.findByPk(req.params.id);
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
        const ganancias = await db.Ganancia.findAll();
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
            finca,
            kilos,
            degrees,
        } = req.body;

        const ganancia = new db.Ganancia({
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
        const ganancia = await db.Ganancia.findByPk(req.params.id);
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
        ganancia.amount = amount;
        ganancia.date = date;
        ganancia.finca = finca;
        ganancia.concept = concept;
        ganancia.kilos = kilos;
        ganancia.degrees = degrees;
        await ganancia.save();
        res.status(200).json(ganancia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteGanancia(req, res) {
    try {
        const ganancia = await db.Ganancia.findByPk(req.params.id);
        if (!ganancia) {
            return res.status(404).json({ error: 'Ganancia not found' });
        }
        await ganancia.destroy();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getGananciasByFinca(req, res) {
    try {
        const ganancias = await db.Ganancia.findAll({ where: { finca: req.params.finca } });
        if (!ganancias) {
            return res.status(404).json({ error: 'Ganancias not found' });
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