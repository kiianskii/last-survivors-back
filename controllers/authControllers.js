import bcrypt from "bcrypt";

import fs from "fs/promises";

import HttpError from "../helpers/HttpError.js";

import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../helpers/ctrlWrapper.js";

import { createToken } from "../helpers/jwt.js";

import cloudinary from "../helpers/cloudinary.js";

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
    id: newUser._id,
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
      id: user._id,
      username: user.username,
      email: user.email,
      theme: user.theme,
    },
  });
};

const getCurrent = (req, res) => {
  const { email, username, theme, _id } = req.user;

  res.json({
    id: _id,
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

const updateAvatar = async (req, res) => {
  try {
    const {url: avatarURL} = await cloudinary.uploader.upload(req.file.path, {
        folder: "avatars"
    });
    const {_id: owner} = req.user;
    await authServices.updateAvatar(owner, avatarURL);
    res.status(201).json({avatarURL});
    
}
catch(error) {
    console.log(error.message);
    throw error;
}
finally {
    await fs.unlink(req.file.path);
}
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  updateAvatar: ctrlWrapper(updateAvatar)
};
