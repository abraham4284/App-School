import { Router } from "express";
import { createFichaMedica, deleteFichaMedica, getFichasMedicas, updateFichaMedica } from "../../controllers/GestionFichaMedica/fichaMedica.js";


const router = Router();

router.get("/", getFichasMedicas);
router.post("/", createFichaMedica);
router.put("/:id", updateFichaMedica);
router.delete("/:id", deleteFichaMedica);

export default router;
