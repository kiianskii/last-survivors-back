import {v2 as cloudinary} from "cloudinary"

const { cloud_name, api_key, api_secret } = process.env;


cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
});

export default cloudinary;