import { Schema, model } from "mongoose";
import { handleError, setUpdateSettings } from "./hooks.js";

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { versionKey: false }
);

const Column = model("column", columnSchema);

columnSchema.post("save", handleError);

columnSchema.pre("findOneAndUpdate", setUpdateSettings);

columnSchema.post("findOneAndUpdate", handleError);

export default Column;
