import { Schema, model } from "mongoose";
import { handleError, setUpdateSettings } from "./hooks.js";

const boardSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        owner_id: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        icon_name: {
            type: String,
        },
        background_url: {
            type: String,
        },
    },
    { versionKey: false }
);

boardSchema.post("save", handleError);
boardSchema.pre("findOneAndUpdate", setUpdateSettings);
boardSchema.post("findOneAndUpdate", handleError);

const Board = model("board", boardSchema);

export default Board;
