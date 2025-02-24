import express from 'express';
import { actualizarPresenciaAlumno, eliminarPresenciaAlumno, insertarPresenciaAlumno, obtenerPresenciaAlumnoPorId, obtenerPresenciaAlumnos } from '../../../controllers/moduleAlumnos/GestionPresenciaAlumnos/presenciaAlumnos.js';

const router = express.Router();

router.get('/', obtenerPresenciaAlumnos);
router.get('/:idRegistroAsistenciaAlumnos', obtenerPresenciaAlumnoPorId);
router.post('/', insertarPresenciaAlumno);
router.put('/:idRegistroAsistenciaAlumnos', actualizarPresenciaAlumno);
router.delete('/:idRegistroAsistenciaAlumnos', eliminarPresenciaAlumno);

export default router;
