import { Router } from "express";
import UserModel from "../dao/models/user.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find().populate("pets");
    res.status(200).json({ status: "success", payload: users });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al obtener usuarios" });
  }
});

router.get("/:uid", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.uid).populate("pets");
    if (!user) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });

    res.status(200).json({ status: "success", payload: user });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al obtener usuario" });
  }
});

export default router;
