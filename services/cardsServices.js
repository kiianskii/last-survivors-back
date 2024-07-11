import Card from "../models/Card.js";

export const getCards = (params = {}) => {
  const { filter, fields, settings } = params;
  return Card.find(filter, fields, settings);
};

export const addCard = (data) => Card.create(data);

export const getCardById = (filter) => Card.findOne(filter);

export const removeCard = (filter) => Card.findOneAndDelete(filter);

export const removeAllCardsByFilter = (filter) => Card.deleteMany(filter);

export const changeColumnId = (filter, column_id) =>
  Card.findOneAndUpdate(filter, column_id);

export const updateCardById = (filter, data) =>
  Card.findOneAndUpdate(filter, data);
