import Joi from "joi";

export const authSignupSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
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
  password: Joi.string().required(),
  email: Joi.string()
    .pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required(),
});

export const changeThemeSchema = Joi.object({
  theme: Joi.alternatives().try(
    Joi.string().valid("light"),
    Joi.string().valid("dark"),
    Joi.string().valid("violet")
  ),
});
