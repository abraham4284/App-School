import { Router } from "express";
import { createOrientacion, deleteOrientacion, getOrientaciones, updateOrientacion } from "../../controllers/GestionOrientaciones/orientaciones.js";


const router = Router();

router.get("/", getOrientaciones);
router.post("/", createOrientacion);
router.put("/:id", updateOrientacion);
router.delete("/:id", deleteOrientacion);

export default router;
