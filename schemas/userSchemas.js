import Joi from "joi";

export const updateUserSchema = Joi.object({
  username: Joi.string().min(3),
  password: Joi.string().min(6),
  email: Joi.string().pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
  theme: Joi.alternatives().try(
    Joi.string().valid("light"),
    Joi.string().valid("dark"),
    Joi.string().valid("violet")
  ),
});
