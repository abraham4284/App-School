import { Router } from "express";
import { createNota, deleteNota, getNotas, updateNota } from "../../../controllers/moduleAlumnos/GestionNotas/notas.js";


const router = Router();

router.get("/", getNotas);
router.post("/", createNota);
router.put("/:id", updateNota);
router.delete("/:id", deleteNota);

export default router;
