import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/authRouter.js";
import boardRouter from "./routes/boardRouter.js";
import cardsRouter from "./routes/cardsRouter.js";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/board", boardRouter);
app.use("/api/cards", cardsRouter);
app.use("/api/user", userRouter);

app.use((_, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
});

const { DB_HOST } = process.env;
// Add port from env
mongoose
    .connect(DB_HOST)
    .then(() => {
        app.listen(3000, () => {
            console.log("Database connection successful");
        });
    })
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    });
