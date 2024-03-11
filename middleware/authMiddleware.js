const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) return res.status(403).json({ success: false, message: 'Failed to authenticate token' });

    // Store decoded user information in request for later use
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
