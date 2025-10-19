import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.api.create_upload_preset({
  name: "journey_imgs_preset",
  folder: 'journey_imgs',
  allowed_formats: ['jpg', 'png', 'webp'],
})
.then(uploadResult => console.log(uploadResult))
.catch (error => console.error(error));
