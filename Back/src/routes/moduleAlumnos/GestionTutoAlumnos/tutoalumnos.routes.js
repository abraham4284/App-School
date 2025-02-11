import { Router } from "express";
import { createTutoAlumno, deleteTutoAlumno, getTutoAlumnos } from "../../../controllers/moduleAlumnos/GestionTutoAlumnos/tutoAlumnos.js";


const router = Router();

router.get("/", getTutoAlumnos);
router.post("/", createTutoAlumno);
router.delete("/:idTutor/:idAlumnos", deleteTutoAlumno);

export default router;
