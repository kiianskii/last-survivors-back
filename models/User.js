import { Schema, model } from "mongoose";

import { handleError, setUpdateSettings } from "./hooks.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      required: [true, "Email is required"],
      unique: true,
    },
    theme: {
      type: String,
      enum: ["light", "dark", "violet"],
      default: "light",
    },
    token: String,
  },
  { versionKey: false }
);

userSchema.post("save", handleError);

userSchema.pre("findOneAndUpdate", setUpdateSettings);

userSchema.post("findOneAndUpdate", handleError);

const User = model("user", userSchema);

export default User;
