const jwt = require('jsonwebtoken');


const JWT_SECRET = 'sheesh';


function getUserIdFromToken(req) {
  const authHeader = req.headers['authorization'];
  
  // O token geralmente é enviado como 'Bearer <TOKEN>'
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    throw new Error('Token não fornecido');
  }
  
  try {

    const decoded = jwt.verify(token, JWT_SECRET);
    
    return decoded.id;
    
  } catch (error) {
    throw new Error('Token inválido');
  }
}

module.exports = { getUserIdFromToken };
