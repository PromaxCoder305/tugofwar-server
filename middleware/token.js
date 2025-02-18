const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });
  
    try {
      const verified = jwt.verify(token, 'secret0011');
      req.user = verified;
      next();
    } catch (error) {
      res.status(400).json({ message: 'Invalid Token' });
    }
  };
  
  module.exports = authMiddleware;