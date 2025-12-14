import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import petModel from "../dao/models/pet.model.js";
import adoptionModel from "../dao/models/adoption.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const adoptions = await adoptionModel.find().populate("owner").populate("pet");
  if (!adoptions.length) return res.status(204).send();
  res.json({ status: "success", payload: adoptions });
});

router.get("/:aid", async (req, res) => {
  const adoption = await adoptionModel.findById(req.params.aid);
  if (!adoption) return res.status(404).json({ status: "error" });
  res.json({ status: "success", payload: adoption });
});

router.post("/:uid/:pid", async (req, res) => {
  const user = await userModel.findById(req.params.uid);
  const pet = await petModel.findById(req.params.pid);

  if (!user || !pet) return res.status(404).json({ status: "error" });
  if (pet.adopted) return res.status(400).json({ status: "error" });

  const adoption = await adoptionModel.create({
    owner: user._id,
    pet: pet._id
  });

  pet.adopted = true;
  pet.owner = user._id;
  await pet.save();

  user.pets.push(pet._id);
  await user.save();

  res.status(201).json({ status: "success", payload: adoption });
});

router.delete("/:aid", async (req, res) => {
  const adoption = await adoptionModel.findById(req.params.aid);
  if (!adoption) return res.status(404).json({ status: "error" });

  await adoptionModel.deleteOne({ _id: adoption._id });
  res.json({ status: "success" });
});

export default router;
