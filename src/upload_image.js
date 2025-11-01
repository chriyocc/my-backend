import { Router } from 'express';
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

const router = Router();

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/images/upload", async (req, res) => {
  try {
    const { image, type = "project_imgs" } = req.body;

    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      upload_preset: `${type}_imgs_preset`,
    });

    res.json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to upload image",
      message: error.message,
    });
  }
});

router.delete("/images/delete", async (req, res) => {
  try {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({ 
        success: false,
        error: "No public_id provided" 
      });
    }

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result === "ok") {
      res.json({
        success: true,
        message: "Image deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Image not found or already deleted",
      });
    }
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete image",
      message: error.message,
    });
  }
});

router.post("/images/signature", (req, res) => {
  try {
    const { folder = "project_imgs", preset = "imgs_preset" } = req.body;
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: folder,
        upload_preset: preset,
      },
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({
      success: true,
      signature: signature,
      timestamp: timestamp,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: folder,
      preset: preset,
    });
  } catch (error) {
    console.error("Signature error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate signature",
      message: error.message,
    });
  }
});

export default router;