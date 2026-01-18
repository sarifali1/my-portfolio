const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = decoded.id;
      next();
    } catch (error) {
      return next(new AppError('Not authorized, token failed', 401));
    }
  } else {
    return next(new AppError('Not authorized, no token', 401));
  }
};

module.exports = { protect };
