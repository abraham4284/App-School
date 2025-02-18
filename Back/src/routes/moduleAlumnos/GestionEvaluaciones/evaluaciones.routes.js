import express from 'express';
import { createEvalucion, deleteEvalucion, getEvaluciones, updateEvalucion } from '../../../controllers/moduleAlumnos/GestionEvaluciones/evaluaciones.js';


const router = express.Router();

// ✅ Obtener todas las evaluaciones
router.get('/', getEvaluciones);

// ✅ Crear una nueva evaluación
router.post('/', createEvalucion);

// ✅ Actualizar una evaluación
router.put('/:id', updateEvalucion);

// ✅ Eliminar una evaluación
router.delete('/:id', deleteEvalucion);

export default router;
