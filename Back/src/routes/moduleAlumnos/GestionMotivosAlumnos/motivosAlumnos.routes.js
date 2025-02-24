import express from "express";
import { createMotivoAlumno, deleteMotivoAlumno, getMotivosAlumnos, updateMotivoAlumno } from "../../../controllers/moduleAlumnos/GestionMotivosAlumnos/motivosAlumnos.js";


const router = express.Router();

router.get("/", getMotivosAlumnos);
router.post("/", createMotivoAlumno);
router.put("/:id", updateMotivoAlumno);
router.delete("/:id", deleteMotivoAlumno);

export default router;
