import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import petModel from "../dao/models/pet.model.js";
import adoptionModel from "../dao/models/adoption.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const adoptions = await adoptionModel.find().populate("owner").populate("pet");

    if (!adoptions.length) return res.status(204).send();

    res.status(200).json({ status: "success", payload: adoptions });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error obteniendo adopciones" });
  }
});

router.get("/:aid", async (req, res) => {
  try {
    const adoption = await adoptionModel
      .findById(req.params.aid)
      .populate("owner")
      .populate("pet");

    if (!adoption)
      return res.status(404).json({ status: "error", message: "Adopción no encontrada" });

    res.status(200).json({ status: "success", payload: adoption });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error obteniendo adopción" });
  }
});

router.post("/:uid/:pid", async (req, res) => {
  try {
    const { uid, pid } = req.params;

    const user = await userModel.findById(uid);
    const pet = await petModel.findById(pid);

    if (!user) return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
    if (!pet) return res.status(404).json({ status: "error", message: "Mascota no encontrada" });

    if (pet.adopted)
      return res.status(400).json({ status: "error", message: "Mascota ya adoptada" });

    const adoption = await adoptionModel.create({ owner: uid, pet: pid });

    pet.adopted = true;
    pet.owner = uid;
    await pet.save();

    user.pets.push(pet._id);
    await user.save();

    res.status(201).json({ status: "success", payload: adoption });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error creando adopción" });
  }
});

router.delete("/:aid", async (req, res) => {
  try {
    const adoption = await adoptionModel.findById(req.params.aid);

    if (!adoption)
      return res.status(404).json({ status: "error", message: "Adopción no encontrada" });

    await adoptionModel.deleteOne({ _id: req.params.aid });

    res.status(200).json({ status: "success", message: "Adopción eliminada" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error eliminando adopción" });
  }
});

export default router;
