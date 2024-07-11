import { Schema, model } from "mongoose";
import { handleError, setUpdateSettings } from "./hooks.js";

const cardsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low", "Without"],
      default: "Without",
    },
    deadline: {
      type: String,
      match: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
      required: true,
    },
    board_id: {
      type: Schema.Types.ObjectId,
      ref: "boards",
      required: true,
    },
    column_id: {
      type: Schema.Types.ObjectId,
      ref: "columns",
      required: true,
    },
  },
  { versionKey: false }
);

const Card = model("card", cardsSchema);

cardsSchema.post("save", handleError);

cardsSchema.pre("findOneAndUpdate", setUpdateSettings);

cardsSchema.post("findOneAndUpdate", handleError);

export default Card;
