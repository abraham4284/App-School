import express from 'express';
import { actualizarTurno, eliminarTurno, insertarTurno, obtenerTurnoPorId, obtenerTurnos } from '../../../controllers/moduleAlumnos/GestionTurnos/turnos.js';

const router = express.Router();

router.get('/', obtenerTurnos);
router.get('/:idTurno', obtenerTurnoPorId);
router.post('/', insertarTurno);
router.put('/:idTurno', actualizarTurno);
router.delete('/:idTurno', eliminarTurno);

export default router;
