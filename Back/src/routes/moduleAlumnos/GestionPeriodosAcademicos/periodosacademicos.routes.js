import { Router } from "express";
import { createPeriodoAcademico, deletePeriodoAcademico, getPeriodosAcademicos, updatePeriodoAcademico } from "../../../controllers/moduleAlumnos/GestionPeriodosAcademicos/periodosacademicos.js";


const router = Router();

router.get("/", getPeriodosAcademicos);
router.post("/", createPeriodoAcademico);
router.put("/:id", updatePeriodoAcademico);
router.delete("/:id", deletePeriodoAcademico);

export default router;
