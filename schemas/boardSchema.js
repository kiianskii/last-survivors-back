import Joi from "joi";

export const createBoardSchema = Joi.object({
    name: Joi.string().required(),
    background_url: Joi.string(),
});

export const updateBoardSchema = Joi.object({
    name: Joi.string(),
    background_url: Joi.string(),
});

