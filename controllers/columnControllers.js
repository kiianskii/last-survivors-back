import * as columnServices from "../services/columnServices.js";
import HttpError from "../helpers/HttpError.js";

import { ColumnAddSchema } from "../schemas/columnsSchema.js";
import { getCards, removeAllCardsByFilter } from "../services/cardsServices.js";

export const createColumn = async (req, res, next) => {
  try {
    const { error } = ColumnAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { board_id } = req.body;
    if (!board_id) {
      throw HttpError(400, error.message);
    }

    const result = await columnServices.addColumn({ ...req.body, board_id });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateColumn = async (req, res, next) => {
  try {
    const { error } = ColumnAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const { board_id } = req.body;

    if (!board_id) {
      throw HttpError(400, error.message);
    }
    const filter = {
      board_id,
      _id: id,
    };

    const result = await columnServices.updateColumnById(filter, req.body);

    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteColumn = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { board_id } = req.body;

    if (!board_id) {
      throw HttpError(400, error.message);
    }
    const filter = {
      board_id,
      _id: id,
    };
    const result = await columnServices.removeColumn(filter);

    if (!result) {
      throw HttpError(404);
    }

    const delCards = removeAllCardsByFilter({ board_id, column_id: id });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllColumns = async (req, res, next) => {
  try {
    const { board_id } = req.body;
    if (!board_id) {
      throw HttpError(400, error.message);
    }
    const filter = {
      board_id,
    };
    const columns = await columnServices.getColumns(filter);

    // const result = await Promise.all(
    //   columns.map(async (column) => {
    //     const filter = {
    //       board_id: column.board_id,
    //       column_id: column._id,
    //     };
    //     const cards = await getCards(filter);
    //     if (cards) {
    //       return { ...column, cards };
    //     } else {
    //       return column;
    //     }
    //   })
    // );

    res.json(columns);
  } catch (error) {
    next(error);
  }
};
