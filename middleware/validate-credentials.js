const Joi = require('@hapi/joi');

const schema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string()
               .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
               .max(50)
               .required(),
});

function validateCredentials (req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  next();
}

module.exports = validateCredentials;
