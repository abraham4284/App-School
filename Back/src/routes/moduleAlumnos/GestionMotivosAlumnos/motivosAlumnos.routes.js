import express from "express";
import { createMotivoAlumno, deleteMotivoAlumno, getMotivosAlumnos, updateMotivoAlumno } from "../../../controllers/moduleAlumnos/GestionMotivosAlumnos/motivosAlumnos.js";


const router = express.Router();

router.get("/motivosalumnos", getMotivosAlumnos);
router.post("/motivosalumnos", createMotivoAlumno);
router.put("/motivosalumnos/:id", updateMotivoAlumno);
router.delete("/motivosalumnos/:id", deleteMotivoAlumno);

export default router;
