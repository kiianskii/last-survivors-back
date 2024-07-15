import express from "express";
import validateBody from "../helpers/validateBody.js";
import isEmptyBody from "../middlewares/emptyBodyCheck.js";

import {
  authSignupSchema,
  authSigninSchema,
  needHelpSchema,
} from "../schemas/authSchemas.js";

import authControllers from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(authSignupSchema),
  authControllers.signup
);

authRouter.post(
  "/login",
  isEmptyBody,
  validateBody(authSigninSchema),
  authControllers.signin
);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.signout);

authRouter.post(
  "/help",
  authenticate,
  isEmptyBody,
  validateBody(needHelpSchema),
  authControllers.helpEmail
);

export default authRouter;
