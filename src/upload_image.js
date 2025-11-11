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

router.get("/images", async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      resource_type: "image",
    });

    const images = result.resources.map((img) => ({
      public_id: img.public_id,
      url: img.secure_url,
      width: img.width,
      height: img.height,
      format: img.format,
      created_at: img.created_at,
    }));

    res.json({
      success: true,
      message: "All images loaded successfully",
      count: images.length,
      data: images,
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get images",
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