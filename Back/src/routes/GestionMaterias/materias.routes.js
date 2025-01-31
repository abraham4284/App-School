import { Router } from "express";
import { createMateria, deleteMateria, getMaterias, updateMateria } from "../../controllers/GestionMaterias/materias.js";


const router = Router();

router.get("/", getMaterias);
router.post("/", createMateria);
router.put("/:id", updateMateria);
router.delete("/:id", deleteMateria);

export default router;
