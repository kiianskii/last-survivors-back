import express from "express";
import authenticate from "../middlewares/authenticate.js";
import isEmptyBody from "../middlewares/emptyBodyCheck.js";
import isValidId from "../middlewares/idValid.js";
import boardControllers from "../controllers/boardControllers.js";

const boardRouter = express.Router();

boardRouter.use(authenticate);

boardRouter.post("/", isEmptyBody, boardControllers.createBoard);
boardRouter.get("/", boardControllers.getBoards);
boardRouter.get("/:id", isValidId, boardControllers.getBoardByID);
boardRouter.patch("/:id", isValidId, isEmptyBody, boardControllers.updateBoard);
boardRouter.delete("/:id", isValidId, boardControllers.deleteBoard);

export default boardRouter;
