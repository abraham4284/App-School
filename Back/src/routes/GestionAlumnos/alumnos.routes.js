import { Router } from "express";
import { createAlumno, deleteAlumno, getAlumnos, updateAlumno } from "../../controllers/GestionAlumnos/alumnos.js";

const router = Router();

router.get("/", getAlumnos);
router.post("/", createAlumno);
router.put("/:id", updateAlumno);
router.delete("/:id", deleteAlumno);

export default router; 