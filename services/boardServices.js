import Board from "../models/Board.js";

async function getBoards(filter) {
    return Board.find(filter);
}

async function getBoardById(filter) {
    const board = Board.findOne(filter);
    return Board.findOne(filter);
}

async function addBoard(data) {
    return Board.create(data);
}

async function updateBoardById(filter, data) {
    return Board.findByIdAndUpdate(filter, data, {
        new: true,
        runValidators: true,
    });
}
async function deleteBoardById(filter) {
    return Board.findByIdAndDelete(filter);
}

export function findBoard(filter) {
    return Board.findOne(filter);
}

export default {
    getBoards,
    getBoardById,
    addBoard,
    updateBoardById,
    deleteBoardById,
    findBoard,
};
