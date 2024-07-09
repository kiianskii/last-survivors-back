import bcrypt from "bcrypt";

import HttpError from "../helpers/HttpError.js";

import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../helpers/ctrlWrapper.js";

const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const { password } = req.body;

  const hashPassword = password ? await bcrypt.hash(password, 10) : "";

  const result = password
    ? await authServices.updateUser(
        { _id },
        { ...req.body, password: hashPassword }
      )
    : await authServices.updateUser({ _id }, req.body);
  if (!result) {
    throw HttpError(404);
  }
  const { username, email, theme } = result;
  res.status(200).json({ username, email, theme });
};

export default {
  updateUser: ctrlWrapper(updateUser),
};
