import Joi from "joi";
import joiObjectId from "joi-objectid";

Joi.objectId = joiObjectId(Joi);

export const ColumnAddSchema = Joi.object({
  title: Joi.string().min(3).required(),
  board_id: Joi.objectId().required(),
});
