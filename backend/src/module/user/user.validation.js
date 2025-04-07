import Joi from "joi";

export const deleteUserSchema = Joi.object({
  id: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  id: Joi.string().required(),
  email: Joi.string().email(),
  name: Joi.string(),
  password: Joi.string().min(8).max(20),
});
