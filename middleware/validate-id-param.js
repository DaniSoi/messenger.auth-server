const Joi = require('@hapi/joi');

const schema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
});

function validateIdParam (req, res, next) {
  const { error } = schema.validate(req.params);
  if (error) return res.status(400).end(error.details[0].message);

  next();
}

module.exports = validateIdParam;
