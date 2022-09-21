const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(8).required().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,1024}$/),
    avatar: Joi.string().min(6).required(),
    perk: Joi.string().min(1),
  });
  return schema.validate(data);
};
const missionsValidation = (data) => {
  const schema = Joi.object({
    id: Joi.string().min(6),
    token: Joi.string().min(6),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const saveItemValidation = (data) => {
  const schema = Joi.object({
    token: Joi.string().required(),
    itemName: Joi.string().required(),
    itemSkill: Joi.string().required(),
    quantity: Joi.number().required(),
    boost: Joi.number().required(),
    price: Joi.number().required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.saveItemValidation = saveItemValidation;
module.exports.missionsValidation = missionsValidation;
