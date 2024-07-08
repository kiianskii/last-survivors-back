import HttpError from "../helpers/HttpError.js";

const isEmptyBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, "Body must have at least one field"));
  }
  next();
};

export default isEmptyBody;
