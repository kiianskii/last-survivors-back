import Joi from "joi";

export const ColumnAddSchema = Joi.object({
  title: Joi.string().min(3).required(),
});
