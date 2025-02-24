import express from 'express';
import { actualizarEvaluacion, eliminarEvaluacion, insertarEvaluacion, obtenerEvaluacionPorId, obtenerEvaluaciones } from '../../../controllers/moduleAlumnos/GestionEvaluaciones/evaluaciones.js';

const router = express.Router();

router.get('/', obtenerEvaluaciones);
router.get('/:idEvaluaciones', obtenerEvaluacionPorId);
router.post('/', insertarEvaluacion);
router.put('/:idEvaluaciones', actualizarEvaluacion);
router.delete('/:idEvaluaciones', eliminarEvaluacion);

export default router;
