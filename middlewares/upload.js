import multer from "multer";
import path from "path";
import HttpError from "../helpers/HttpError.js";

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
        const filename = uniquePrefix + "_" + file.originalname;
        cb(null, filename);
    },
});

const limits = {
    fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    if (ext === "exe") cb(HttpError(400, `Extension '${ext}' is not allowed.`));
    cb(null, true);
};

const upload = multer({ storage, limits, fileFilter });

export default upload;
