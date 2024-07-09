import bcrypt from "bcrypt";

import HttpError from "../helpers/HttpError.js";

import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../helpers/ctrlWrapper.js";

import { createToken } from "../helpers/jwt.js";

const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await authServices.findUser({ email });

  if (user) {
    throw HttpError(409, "User with this email already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await authServices.signup({
    ...req.body,
    password: hashPassword,
    theme: "light",
  });

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
    theme: newUser.theme,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const { _id: id } = user;
  const payload = {
    id,
  };

  const token = createToken(payload);

  await authServices.updateUser({ _id: id }, { token });

  res.json({
    token,
    user: {
      username: user.username,
      email: user.email,
      theme: user.theme,
    },
  });
};

const getCurrent = (req, res) => {
  const { email, username, theme } = req.user;

  res.json({
    username,
    email,
    theme,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await authServices.updateUser({ _id }, { token: "" });

  res.json({
    message: "Logout success",
  });
};

const changeTheme = async (req, res) => {
  const { id: _id } = req.params;
  const result = await authServices.updateUser({ _id }, req.body);
  if (!result) {
    throw HttpError(404);
  }
  const { username, email, theme } = result;
  res.status(200).json({ username, email, theme });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  changeTheme: ctrlWrapper(changeTheme),
};
