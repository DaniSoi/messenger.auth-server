const Joi = require('@hapi/joi');

const schema = Joi.object({
  token: Joi.string().min(4).required(),
});

function validateToken (req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).end(error.details[0].message);

  next();
}

module.exports = validateToken;
