import express from 'express';
import { actualizarTutorAlumno, eliminarTutorAlumno, insertarTutorAlumno, obtenerTutorAlumnoPorId, obtenerTutoresAlumnos } from '../../../controllers/moduleAlumnos/GestionTutoAlumnos/tutoAlumnos.js';

const router = express.Router();

router.get('/', obtenerTutoresAlumnos);
router.get('/:idTutor/:idAlumno', obtenerTutorAlumnoPorId);
router.post('/', insertarTutorAlumno);
router.put('/:idTutor/:idAlumno', actualizarTutorAlumno);
router.delete('/:idTutor/:idAlumno', eliminarTutorAlumno);

export default router;
