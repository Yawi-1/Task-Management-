const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ error: 'Token missing' });
    }
  
    const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer'
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Add decoded user info to the request
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };

module.exports = authenticate;
