import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import petModel from "../dao/models/pet.model.js";
import { generateMockUsers, generateMockPets } from "../utils/mockingUtils.js";

const router = Router();

router.get("/mockingpets", async (req, res) => {
  try {
    const pets = generateMockPets(10);
    res.status(200).json({ status: "success", payload: pets });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al generar mascotas" });
  }
});

router.get("/mockingusers", async (req, res) => {
  try {
    const users = generateMockUsers(50);
    res.status(200).json({ status: "success", payload: users });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al generar usuarios" });
  }
});

router.post("/generateData", async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    const mockUsers = generateMockUsers(users);
    const mockPets = generateMockPets(pets);

    if (mockUsers.length) await userModel.insertMany(mockUsers);
    if (mockPets.length) await petModel.insertMany(mockPets);

    res.status(200).json({
      status: "success",
      message: `Se generaron ${mockUsers.length} usuarios y ${mockPets.length} mascotas.`
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al generar datos" });
  }
});

export default router;
