import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import mocksRouter from "./routes/mocks.router.js";
import adoptionRouter from "./routes/adoption.router.js";

import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
const usersDoc = yaml.load(fs.readFileSync(path.resolve("src/docs/users.yaml")));
const adoptionsDoc = yaml.load(fs.readFileSync(path.resolve("src/docs/adoptions.yaml")));

app.use("/api/docs/users", swaggerUi.serve, swaggerUi.setup(usersDoc));
app.use("/api/docs/adoptions", swaggerUi.serve, swaggerUi.setup(adoptionsDoc));

// MongoDB
mongoose
  .connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/backend3-farina")
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error("❌ Error Mongo:", err));

// Routes
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/mocks", mocksRouter);
app.use("/api/adoptions", adoptionRouter);

app.get("/", (req, res) => {
  res.send("🚀 Backend III - Entrega Final - Farina");
});

export default app;

// Server
const PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`🟢 Servidor activo en puerto ${PORT}`));
}
