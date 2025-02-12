const {tokenDecode, JWTExpiredError} = require('../helpers/jwt.helper')

function auth(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try{
    const user = tokenDecode(token);
    req.user = user;
    next();
  }catch(err){
    if (err instanceof JWTExpiredError) {
      return res.status(401).json({ message: 'Token has expired. Please log in again' });
    }    
      return res.status(403).json({ message: 'Invalid token.' });
  }
}

module.exports = { auth };