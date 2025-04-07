const { compareSync } = require('bcrypt');
const db = require('../services/db');
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;


async function getFinca(req, res) {
    try {
        const finca = await db.Finca.findById(req.params.id);
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
        const fincas = await db.Finca.find();
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
        } = req.body;
        const owner = req.user.id;

        const finca =await db.Finca.create({
            name,
            location,
            surface,
            oliveAmount,
            owner,
        });
        console.log('finca', finca.owner);
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
        let { id } = req.params;
        id = new ObjectId(id)
        const finca = await db.Finca.findOne(id);

        if (!finca) {
            return res.status(404).json({ message: 'Finca not found' });
        }
        const ownerF = finca.owner;
        const userId = new ObjectId(req.user.id);

        if (!ownerF.equals(userId)) {
            return res.status(403).json({ message: 'You are not authorized to update this finca' });
        }
        

        const { name, location, surface, oliveAmount, owner } = req.body;

        const updateFields = {
            name: name || finca.name,
            location: location || finca.location,
            surface: surface || finca.surface,
            oliveAmount: oliveAmount || finca.oliveAmount,
            owner: owner || finca.owner,
        };

        const updatedFinca = await db.Finca.findOneAndUpdate(
            id,
            updateFields,
            { new: true, runValidators: true, lean: true }
        );

        if (!updatedFinca) {
            return res.status(400).json({ message: 'Error updating finca' });
        }

        res.status(200).json(updatedFinca);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteFinca(req, res) {
    try {
        const fincaId = req.params;
        const finca = await db.Finca.findById(fincaId.id);
        if (!finca) {
            return res.status(404).json({ error: 'Finca not found' });
        }
        if (finca.owner.toJSON() !== req.user.id) {
            return res.status(403).json({ error: 'You are not authorized to delete this finca' });
        }
        const fincaDeleted = finca;
        await finca.deleteOne();
        res.status(200).json(fincaDeleted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getFincasSocio(req, res) {
    try {
        const fincas = await db.Finca.find({ owner: req.user.id });

        if (!fincas || fincas.length === 0) {
            return res.status(404).json({ error: 'No fincas found for this Socio' });
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