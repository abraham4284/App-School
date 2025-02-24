import express from 'express';
import { actualizarPeriodoAcademico, eliminarPeriodoAcademico, insertarPeriodoAcademico, obtenerPeriodoAcademicoPorId, obtenerPeriodosAcademicos } from '../../../controllers/moduleAlumnos/GestionPeriodosAcademicos/periodosacademicos.js';

const router = express.Router();

router.get('/', obtenerPeriodosAcademicos);
router.get('/:idPeriodoAcademico', obtenerPeriodoAcademicoPorId);
router.post('/', insertarPeriodoAcademico);
router.put('/:idPeriodoAcademico', actualizarPeriodoAcademico);
router.delete('/:idPeriodoAcademico', eliminarPeriodoAcademico);

export default router;
