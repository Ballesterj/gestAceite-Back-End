const jwt = require('jsonwebtoken');
require('dotenv').config({ path: `${__dirname}/env/.env` });

const tokenDecode = (token) => jwt.verify(token, process.env.JWT_SECRET);

const dataEncode = (data) => jwt.sign(data, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_TIME });

module.exports = {
tokenDecode,
dataEncode,
JWTExpiredError: jwt.TokenExpiredError,
};