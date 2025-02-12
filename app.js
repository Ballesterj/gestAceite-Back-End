const express = require('express');
const cors = require('cors');
const mainRouter = require('./src/routes/index');
require('dotenv').config({ path: `${__dirname}/env/.env` });
const { connectDB, getDB } = require('./src/services/db/db.connection');
const { ValidationError } = require('express-validation');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', mainRouter);

app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json({
            errors: [
                ...(err.details.body?.map(detail => detail.message) || []),
                ...(err.details.params?.map(detail => detail.message) || []),
                ...(err.details.query?.map(detail => detail.message) || []),
                ...(err.details.headers?.map(detail => detail.message) || []),
            ].length > 0 ? 
            [
                ...(err.details.body?.map(detail => detail.message) || []),
                ...(err.details.params?.map(detail => detail.message) || []),
                ...(err.details.query?.map(detail => detail.message) || []),
                ...(err.details.headers?.map(detail => detail.message) || []),
            ] : ["Validation error"]
        });
    }

    res.status(500).json({ message: err.message || "Internal Server Error" });
});



async function startServer() {
    try {
       
        await connectDB();
        console.log('Conexión a la base de datos exitosa');

        app.listen(process.env.PORT, () => {
            console.log('Servidor corriendo en el puerto: ' + process.env.PORT);
        });
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
    }
}

startServer();
