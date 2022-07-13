const Joi = require("joi");

const registerValidation = data => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    avatar: Joi.string().min(6).required(),
    perk: Joi.string().min(1),
  });
  return schema.validate(data);
};

const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

const saveItemValidation = data => {
  const schema = Joi.object({
    token: Joi.string().required(),
    itemName: Joi.string().required(),
    itemSkill: Joi.string().required(),
    quantity: Joi.number().required(),
    percentage: Joi.number().required(),
    price: Joi.number().required(),
  })
  return schema.validate(data)
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.saveItemValidation = saveItemValidation;
