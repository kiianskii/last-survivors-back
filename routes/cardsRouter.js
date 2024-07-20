import express from "express";
import isEmptyBody from "../middlewares/emptyBodyCheck.js";
import authenticate from "../middlewares/authenticate.js";
import idValid from "../middlewares/idValid.js";
import {
  getAllCards,
  getOneCard,
  createCard,
  deleteCard,
  updateCard,
  changeIdColumn,
} from "../controllers/cardsControllers.js";

const cardsRouter = express.Router();

cardsRouter.use(authenticate);

cardsRouter.get("/", getAllCards);

cardsRouter.get("/:id", idValid, getOneCard);

cardsRouter.post("/", createCard);

cardsRouter.delete("/:id", deleteCard);

cardsRouter.patch("/:id", isEmptyBody, updateCard);

cardsRouter.patch("/column/:id", isEmptyBody, changeIdColumn);

export default cardsRouter;
