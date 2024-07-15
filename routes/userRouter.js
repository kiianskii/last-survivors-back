import express from "express";
import validateBody from "../helpers/validateBody.js";
import isEmptyBody from "../middlewares/emptyBodyCheck.js";
import { updateUserSchema } from "../schemas/userSchemas.js";
import userControllers from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.patch(
  "/:id",
  isEmptyBody,
  validateBody(updateUserSchema),
  userControllers.updateUser
);

export default userRouter;
