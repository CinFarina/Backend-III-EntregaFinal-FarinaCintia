import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import mocksRouter from "./routes/mocks.router.js";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionRouter from "./routes/adoption.router.js";

import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

dotenv.config();

const app = express();

// ==== Swagger ====
const __dirname = path.resolve();
const usersYamlPath = path.join(__dirname, "src/docs/users.yaml");
const usersSwagger = yaml.load(fs.readFileSync(usersYamlPath, "utf8"));

const adoptionsYamlPath = path.join(__dirname, "src/docs/adoptions.yaml");
const adoptionsSwagger = yaml.load(fs.readFileSync(adoptionsYamlPath, "utf8"));

app.use("/api/docs/users", swaggerUi.serve, swaggerUi.setup(usersSwagger));
app.use("/api/docs/adoptions", swaggerUi.serve, swaggerUi.setup(adoptionsSwagger));

// ==== Middlewares ====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==== Conexión a Mongo ====
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/backend3-farina";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error:", err));

// ==== Rutas ====
app.use("/api/mocks", mocksRouter);
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionRouter);

app.get("/", (req, res) => {
  res.send("🚀 Backend III - Proyecto Final - Farina funcionando correctamente");
});

export default app;

// Servidor
if (process.env.NODE_ENV !== "test") {
  app.listen(8080, () => console.log("🟢 Servidor en puerto 8080"));
}