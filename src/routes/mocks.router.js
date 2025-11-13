import { Router } from "express";
import userModel from "../dao/models/user.model.js";
import petModel from "../dao/models/pet.model.js";
import { generateMockUsers, generateMockPets } from "../utils/mockingUtils.js";

const router = Router();

// Endpoint: GET /api/mocks/mockingpets
router.get("/mockingpets", async (req, res) => {
  try {
    const pets = generateMockPets(10);
    res.status(200).json({ status: "success", payload: pets });
  } catch (error) {
    console.error("Error al generar mascotas:", error);
    res.status(500).json({ status: "error", message: "Error al generar mascotas" });
  }
});

// Endpoint: GET /api/mocks/mockingusers
router.get("/mockingusers", async (req, res) => {
  try {
    const users = await generateMockUsers(50); 
    res.status(200).json({ status: "success", payload: users });
  } catch (error) {
    console.error("Error al generar usuarios:", error);
    res.status(500).json({ status: "error", message: "Error al generar usuarios" });
  }
});

// Endpoint: POST /api/mocks/generateData
router.post("/generateData", async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    const mockUsers = await generateMockUsers(users);
    const mockPets = generateMockPets(pets);

    if (mockUsers.length > 0) await userModel.insertMany(mockUsers);
    if (mockPets.length > 0) await petModel.insertMany(mockPets);

    res.status(200).json({
      status: "success",
      message: `Se generaron ${mockUsers.length} usuarios y ${mockPets.length} mascotas.`,
    });
  } catch (error) {
    console.error("Error al insertar datos en MongoDB:", error);
    res.status(500).json({ status: "error", message: "Error al generar datos" });
  }
});

export default router;