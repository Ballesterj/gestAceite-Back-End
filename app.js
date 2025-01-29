const express = require('express');
const cors = require('cors');
const mainRouter = require('./src/routes/index');
require('dotenv').config({ path: `${__dirname}/env/.env` });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', mainRouter);

//Don't exist the route
app.use((err, req, res, next) => {
    if (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(process.env.PORT, () => {
    console.log('Server is running on port: ' + process.env.PORT);
});