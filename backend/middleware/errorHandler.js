// Custom Error Class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Operational errors vs programming errors
    Error.captureStackTrace(this, this.constructor);
  }
}

// Not Found Error Handler (404)
const notFound = (req, res, next) => {
  const error = new AppError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};

// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error('❌ Error:', {
    message: err.message,
    statusCode: err.statusCode,
    stack: process.env.NODE_ENV === 'development' ? err.stack : '🔒'
  });

  // Default to 500 if statusCode not set
  const statusCode = err.statusCode || 500;

  // Send error response
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    
    // Only show stack trace in development
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      error: err 
    }),

    // Handle specific error types
    ...(err.name === 'ValidationError' && {
      errors: Object.values(err.errors).map(e => e.message)
    }),

    ...(err.name === 'CastError' && {
      message: 'Invalid ID format'
    }),

    ...(err.code === 11000 && {
      message: 'Duplicate field value entered'
    })
  });
};

module.exports = { AppError, notFound, errorHandler };
