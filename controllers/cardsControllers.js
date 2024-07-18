import * as cardService from "../services/cardsServices.js";
import HttpError from "../helpers/HttpError.js";

import { CardAddSchema, CardUpdateSchema } from "../schemas/cardsSchemas.js";

export const getAllCards = async (req, res, next) => {
  try {
    const { board_id, column_id } = req.body;
    const filter = {
      board_id,
      column_id,
    };
    const result = await cardService.getCards({ filter });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getOneCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { board_id, column_id } = req.body;
    const filter = {
      board_id,
      column_id,
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
    // const { board_id, column_id } = req.body;
    const filter = {
      _id: id,
    };
    const result = await cardService.removeCard(filter);

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

    const { board_id, column_id } = req.body;
    const result = await cardService.addCard({
      ...req.body,
      board_id,
      column_id,
    });

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
    const { board_id, column_id } = req.body;
    const filter = {
      board_id,
      column_id,
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

export const changeIdColumn = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { board_id, oldColumn_id } = req.body;
    const filter = {
      board_id,
      _id: id,
    };

    const result = await cardService.changeColumnId(filter, {
      column_id: req.body.column_id,
    });

    if (!result) {
      throw HttpError(404);
    }

    res.json({ ...result, oldColumn_id });
  } catch (error) {
    next(error);
  }
};
