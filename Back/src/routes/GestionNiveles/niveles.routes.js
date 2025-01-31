import { Router } from "express";
import { createNivel, deleteNivel, getNiveles, updateNivel } from "../../controllers/GestionNiveles/niveles.js";


const router = Router();

router.get("/", getNiveles);
router.post("/", createNivel);
router.put("/:id", updateNivel);
router.delete("/:id", deleteNivel);

export default router;
