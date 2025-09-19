import express from "express";
import projectRoutes from "./projectRoutes.js";

const app = express();
app.use(express.json());

app.use('/api/v1', projectRoutes);

export default app;