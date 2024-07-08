import Joi from "joi";

export const CardAddSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string().valid("High", "Medium", "Low", "Without").required(),
  deadline: Joi.string()
    .pattern(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)
    .required(),
});

export const CardUpdateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string().valid("High", "Medium", "Low", "Without"),
  deadline: Joi.string().pattern(
    /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
  ),
});