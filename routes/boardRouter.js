import express from "express";
import authenticate from "../middlewares/authenticate.js";
import isEmptyBody from "../middlewares/emptyBodyCheck.js";
import isValidId from "../middlewares/idValid.js";
import boardControllers from "../controllers/boardControllers.js";
import upload from "../middlewares/upload.js";

const boardRouter = express.Router();

boardRouter.use(authenticate);

boardRouter.post("/", upload.single("img"), boardControllers.createBoard);
boardRouter.get("/", boardControllers.getBoards);
boardRouter.get("/:id", isValidId, boardControllers.getBoardByID);
boardRouter.patch(
    "/:id",
    isValidId,
    upload.single("img"),
    boardControllers.updateBoard
);
boardRouter.delete("/:id", isValidId, boardControllers.deleteBoard);

export default boardRouter;
