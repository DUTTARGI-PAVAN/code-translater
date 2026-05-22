export const notFoundHandler = (req, res, next) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
};

export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Internal server error." : err.message;
  res.status(statusCode).json({ success: false, message });
};
