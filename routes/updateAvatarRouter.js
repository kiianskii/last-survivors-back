import express from "express";

import upload from "../middlewares/upload.js";
import authControllers from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

const updateAvatarRouter = express.Router();

updateAvatarRouter.use(authenticate);

updateAvatarRouter.patch(
  "/",
  upload.single("avatarURL"),
  authControllers.updateAvatar
);

export default updateAvatarRouter;