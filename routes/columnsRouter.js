import express from "express";
import isEmptyBody from "../middlewares/emptyBodyCheck.js";
import authenticate from "../middlewares/authenticate.js";
import idValid from "../middlewares/idValid.js";
import {
  createColumn,
  deleteColumn,
  getAllColumns,
  getColumnsFiltered,
  updateColumn,
} from "../controllers/columnControllers.js";

const columnsRouter = express.Router();

columnsRouter.use(authenticate);

columnsRouter.get("/:id", getAllColumns);

columnsRouter.post("/:board_id", isEmptyBody, getColumnsFiltered);

columnsRouter.post("/", isEmptyBody, createColumn);

columnsRouter.delete("/:id", idValid, deleteColumn);

columnsRouter.patch("/:id", idValid, isEmptyBody, updateColumn);

export default columnsRouter;
