import express from 'express';
import { actualizarNota, eliminarNota, insertarNota, obtenerNotaPorId, obtenerNotas } from '../../../controllers/moduleAlumnos/GestionNotas/notas.js';

const router = express.Router();

router.get('/', obtenerNotas);
router.get('/:idNota', obtenerNotaPorId);
router.post('/', insertarNota);
router.put('/:idNota', actualizarNota);
router.delete('/:idNota', eliminarNota);

export default router;
