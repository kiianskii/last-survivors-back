import * as cardService from "../services/cardsServices.js";
import HttpError from "../helpers/HttpError.js";

import { CardAddSchema, CardUpdateSchema } from "../schemas/cardsSchemas.js";

export const getAllCards = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const filter = {
      owner,
    };
    const result = await cardService.getCards(filter);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const filter = {
      owner,
      _id: id,
    };
    const result = await cardService.getCardById(filter);

    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const filter = {
      owner,
      _id: id,
    };
    const result = await cardService.deleteCard(filter);

    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const createCard = async (req, res, next) => {
  try {
    const { error } = CardAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { _id: owner } = req.user;
    const result = await cardService.addCard({ ...req.body, owner });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateCard = async (req, res, next) => {
  try {
    const { error } = CardUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const { _id: owner } = req.user;
    const filter = {
      owner,
      _id: id,
    };

    const result = await cardService.updateCardById(filter, req.body);

    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};
