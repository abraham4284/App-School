import express from 'express';
import { actualizarOrientacion, eliminarOrientacion, insertarOrientacion, obtenerOrientacionPorId, obtenerOrientaciones } from '../../../controllers/moduleAlumnos/GestionOrientaciones/orientaciones.js';

const router = express.Router();

router.get('/', obtenerOrientaciones);
router.get('/:idOrientacion', obtenerOrientacionPorId);
router.post('/', insertarOrientacion);
router.put('/:idOrientacion', actualizarOrientacion);
router.delete('/:idOrientacion', eliminarOrientacion);

export default router;
