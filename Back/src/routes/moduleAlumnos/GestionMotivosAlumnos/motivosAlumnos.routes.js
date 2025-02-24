import express from 'express';
import { actualizarMotivoAlumno, eliminarMotivoAlumno, insertarMotivoAlumno, obtenerMotivoAlumnoPorId, obtenerMotivosAlumnos } from '../../../controllers/moduleAlumnos/GestionMotivosAlumnos/motivosAlumnos.js';

const router = express.Router();

router.get('/', obtenerMotivosAlumnos);
router.get('/:idMotivo', obtenerMotivoAlumnoPorId);
router.post('/', insertarMotivoAlumno);
router.put('/:idMotivo', actualizarMotivoAlumno);
router.delete('/:idMotivo', eliminarMotivoAlumno);

export default router;
