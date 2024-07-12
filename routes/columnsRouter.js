import express from "express";
import isEmptyBody from "../middlewares/emptyBodyCheck.js";
import authenticate from "../middlewares/authenticate.js";
import idValid from "../middlewares/idValid.js";
import {
  createColumn,
  deleteColumn,
  getAllColumns,
  getColumnById,
  updateColumn,
} from "../controllers/columnControllers.js";

const columnsRouter = express.Router();

columnsRouter.use(authenticate);

columnsRouter.get("/", getAllColumns);

columnsRouter.get("/:id", idValid, getColumnById);

columnsRouter.post("/", isEmptyBody, createColumn);

columnsRouter.delete("/:id", idValid, deleteColumn);

columnsRouter.patch("/:id", idValid, isEmptyBody, updateColumn);

export default columnsRouter;
