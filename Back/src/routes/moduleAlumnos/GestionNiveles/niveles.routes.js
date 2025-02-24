import express from 'express';
import { actualizarNivel, eliminarNivel, insertarNivel, obtenerNivelPorId, obtenerNiveles } from '../../../controllers/moduleAlumnos/GestionNiveles/niveles.js';

const router = express.Router();

router.get('/', obtenerNiveles);
router.get('/:idNivel', obtenerNivelPorId);
router.post('/', insertarNivel);
router.put('/:idNivel', actualizarNivel);
router.delete('/:idNivel', eliminarNivel);

export default router;
