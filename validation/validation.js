const Joi = require("@hapi/joi");

const validationRegistration = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};
const validationLogIn = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports.validationRegistration = validationRegistration;
