const Joi = require('@hapi/joi');

const schema = Joi.object({
  ids: Joi.array().items(
    Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
  ),
  emails: Joi.array().items(
    Joi.string().email({ minDomainSegments: 2 })
  ),
}).xor('ids', 'emails');

function validateUsersGroup (req, res, next) {
  const { error } = schema.validate(req.query);
  if (error) return res.status(400).send(error.details[0].message);

  next();
}

module.exports = validateUsersGroup;
