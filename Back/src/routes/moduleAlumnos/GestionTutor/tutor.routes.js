import { Router } from "express";
import { createTutor, deleteTutor, getTutores, updateTutor } from "../../../controllers/moduleAlumnos/GestionTutor/tutor.js";


const router = Router();

router.get("/", getTutores);  // Obtener todos los tutores
router.post("/", createTutor);  // Crear un nuevo tutor
router.put("/:id", updateTutor);  // Actualizar un tutor existente
router.delete("/:id", deleteTutor);  // Eliminar un tutor

export default router;
