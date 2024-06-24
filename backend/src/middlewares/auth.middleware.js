// middlewares/auth.middleware.js
import userService from '../services/user.service.js';

export const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Authorization header missing or malformed' });
  }
  
  const token = authHeader.split(' ')[1];
  const decoded = userService.verifyToken(token);
  if (!decoded) {
    return res.status(401).send({ message: 'Invalid token' });
  }
  
  req.user = decoded;
  next();
};

export const isPlayer = (req, res, next) => {
  isAuthenticated(req, res, () => {
    const token = req.headers.authorization.split(' ')[1];
    const player = userService.getPlayerByToken(token);
    if (!player) {
      return res.status(403).send({ message: 'Access denied. Player role required.' });
    }
    req.player = player;
    next();
  });
};

export const isAdmin = (req, res, next) => {
  isAuthenticated(req, res, () => {
    if (!req.user.admin) {
      return res.status(403).send({ message: 'Access denied. Admin role required.' });
    }
    next();
  });
};
