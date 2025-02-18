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
        
        const updatedCooperativa = await db.Cooperativa.findOneAndUpdate(
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

/**
 * @brief Retrieves socios (members) of a cooperativa (cooperative) by its ID.
 * 
 * This asynchronous function fetches socios associated with a specific cooperativa
 * from the database. If no socios are found, it returns a 404 status with an error message.
 * In case of any other errors, it returns a 500 status with the error message.
 * 
 * @param {Object} req - The request object.
 * @param {Object} req.params - The parameters of the request.
 * @param {string} req.params.id - The ID of the cooperativa.
 * @param {Object} res - The response object.
 * 
 * @returns {Promise<void>} A promise that resolves to void.
 */
async function getSocios(req, res) {
    try {
        const socios = await db.Socio.find({ cooperativa: req.params.id });
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