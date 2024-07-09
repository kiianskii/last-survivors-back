import Joi from "joi";

export const authSignupSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required(),
  theme: Joi.alternatives().try(
    Joi.string().valid("light"),
    Joi.string().valid("dark"),
    Joi.string().valid("violet")
  ),
});

export const authSigninSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required(),
});
