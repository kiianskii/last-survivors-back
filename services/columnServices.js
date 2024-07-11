import Column from "../models/Column.js";

export const addColumn = (data) => Column.create(data);

export const updateColumnById = (filter, data) =>
  Column.findOneAndUpdate(filter, data);

export const removeColumn = (filter) => Column.findOneAndDelete(filter);

export const removeAllColumns = (filter) => Column.deleteMany(filter);

export const getColumns = (params = {}) => {
  const { filter, fields, settings } = params;
  return Column.find(filter, fields, settings);
};
