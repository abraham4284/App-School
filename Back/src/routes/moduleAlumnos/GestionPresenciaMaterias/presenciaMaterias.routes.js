import { Router } from 'express';
import { actualizarAsistencia, eliminarAsistencia, insertarAsistencia, obtenerAsistenciaPorId, obtenerAsistencias } from '../../../controllers/moduleAlumnos/GestionPresenciaMaterias/presenciaMaterias.js';


const router = Router();

router.get('/', obtenerAsistencias);
router.get('/:id', obtenerAsistenciaPorId);
router.post('/', insertarAsistencia);
router.put('/:id', actualizarAsistencia);
router.delete('/:id', eliminarAsistencia);

export default router;
