import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import getFilterWith from "../helpers/getFilterWith.js";
import {
    createBoardSchema,
    updateBoardSchema,
} from "../schemas/boardSchema.js";
import boardServices from "../services/boardServices.js";
import { v2 as cloudinary } from "cloudinary";

import * as columnServices from "../services/columnServices.js";
const { cloud_name, api_key, api_secret } = process.env;

cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
});

const getBoards = async (req, res, next) => {
    const { _id: owner_id } = req.user;
    const filter = {
        owner_id,
    };
    const result = await boardServices.getBoards(filter);
    res.json(result);
};

const getBoardByID = async (req, res, next) => {
    const filter = getFilterWith.OwnerId(req);
    const result = await boardServices.getBoardById(filter);
    if (!result) {
        throw HttpError(404, `Board Not found`);
    }

    const columns = await columnServices.getColumns({
        owner: filter.owner_id,
        board_id: filter._id,
    });
    const resultWithColumns = { ...result._doc, columns };
    res.json(resultWithColumns);
};

const createBoard = async (req, res, next) => {
    const { _id: owner_id } = req.user;
    const { name } = req.body;

    const { error } = createBoardSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }

    const board = await boardServices.findBoard({ name, owner_id });
    if (board) {
        throw HttpError(409, "Board with this name already exists");
    }

    if (req.file) {
        const { path } = req.file;
        let uploadResult;
        await cloudinary.uploader
            .upload(path)
            .then((result) => (uploadResult = result.secure_url));
        req.body.background_url = uploadResult;
    } else if (!Object.keys(req.body).length) {
        return next(HttpError(400, "Body must have at least one field"));
    }

    const result = await boardServices.addBoard({
        ...req.body,
        owner_id,
    });

    res.status(201).json(result);
};

const updateBoard = async (req, res, next) => {
    const { _id: owner_id } = req.user;
    const { name } = req.body;
    const filter = getFilterWith.OwnerId(req);

    const { error } = updateBoardSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }

    const board = await boardServices.findBoard({ name, owner_id });
    if (board) {
        throw HttpError(409, "Board with this name already exists");
    }

    if (req.file) {
        const { path } = req.file;
        let uploadResult;
        await cloudinary.uploader
            .upload(path)
            .then((result) => (uploadResult = result.secure_url));
        req.body.background_url = uploadResult;
    } else if (!Object.keys(req.body).length) {
        return next(HttpError(400, "Body must have at least one field"));
    }

    const result = await boardServices.updateBoardById(filter, req.body);
    if (!result) {
        throw HttpError(404, `Board Not found`);
    }

    res.json(result);
};

const deleteBoard = async (req, res, next) => {
    const filter = getFilterWith.OwnerId(req);
    const result = await boardServices.deleteBoardById(filter);
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.json(result);
};

export default {
    getBoards: ctrlWrapper(getBoards),
    getBoardByID: ctrlWrapper(getBoardByID),
    createBoard: ctrlWrapper(createBoard),
    updateBoard: ctrlWrapper(updateBoard),
    deleteBoard: ctrlWrapper(deleteBoard),
};
