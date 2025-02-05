import { Router } from "express";
import { createCurso, deleteCurso, getCursos, updateCurso } from "../../../controllers/GestionCurso/curso.js";


const router = Router();

router.get("/", getCursos);
router.post("/", createCurso);
router.put("/:id", updateCurso);
router.delete("/:id", deleteCurso);

export default router;
