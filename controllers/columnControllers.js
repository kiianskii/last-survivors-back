import * as columnServices from "../services/columnServices.js";
import HttpError from "../helpers/HttpError.js";

import { ColumnAddSchema } from "../schemas/columnsSchema.js";

export const createColumn = async (req, res, next) => {
  try {
    const { error } = ColumnAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { _id: owner } = req.user;
    const result = await columnServices.addColumn({ ...req.body, owner });

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
    const { _id: owner } = req.user;
    const filter = {
      owner,
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
    const { _id: owner } = req.user;
    const filter = {
      owner,
      _id: id,
    };
    const result = await columnServices.removeColumn(filter);

    if (!result) {
      throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllColumns = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const filter = {
      owner,
    };
    const result = await columnServices.getColumns(filter);

    res.json(result);
  } catch (error) {
    next(error);
  }
};
