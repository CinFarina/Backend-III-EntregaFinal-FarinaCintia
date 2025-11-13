import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import mocksRouter from "./routes/mocks.router.js";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB local
const MONGO_URL = "mongodb://127.0.0.1:27017/backend3-farina";

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("✅ Conectado a MongoDB local"))
  .catch((err) => console.error("❌ Error al conectar MongoDB:", err));

// Rutas principales
app.use("/api/mocks", mocksRouter);

// Ruta base
app.get("/", (req, res) => {
  res.send("🚀 Backend III - Primer Entrega - Farina funcionando correctamente");
});

// Servidor
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`🟢 Servidor funcionando en puerto ${PORT}`);
});