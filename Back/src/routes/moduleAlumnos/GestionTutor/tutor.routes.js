import express from 'express';
import { actualizarTutor, eliminarTutor, insertarTutor, obtenerTutorPorId, obtenerTutores } from '../../../controllers/moduleAlumnos/GestionTutor/tutor.js';

const router = express.Router();

router.get('/', obtenerTutores);
router.get('/:idTutor', obtenerTutorPorId);
router.post('/', insertarTutor);
router.put('/:idTutor', actualizarTutor);
router.delete('/:idTutor', eliminarTutor);

export default router;
