import express from "express";
import projectRoutes from "./projectRoutes.js";
import cors from "cors";

const app = express();

//whitelist for CORS
const allowedOrigins = [
  "https://www.yoyojun.site", 
  "https://api.yoyojun.site", 
  "http://localhost:5501"    
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  })
);

app.use(express.json());

app.use('/api/v1', projectRoutes);

export default app;