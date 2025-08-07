const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse({
        ...req.body,
        ...req.params,
        ...req.query
      });
      
      // Update request with validated data
      req.validatedData = validatedData;
      next();
    } catch (error) {
      if (error.errors) {
        const validationErrors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }));
        
        return res.status(400).json({
          message: 'Validation failed',
          errors: validationErrors
        });
      }
      
      return res.status(400).json({
        message: 'Invalid request data'
      });
    }
  };
};

module.exports = {
  validateRequest
}; 