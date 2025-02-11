import { Router } from "express";
import { createCursoMateria, deleteCursoMateria, getCursosMateria } from "../../../controllers/moduleAlumnos/GestionCursosMateria/cursosMateria.js";


const router = Router();

router.get("/", getCursosMateria);
router.post("/", createCursoMateria);
router.delete("/:idCurso/:idMaterias", deleteCursoMateria);

export default router;
