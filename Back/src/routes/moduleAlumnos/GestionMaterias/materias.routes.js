import express from 'express';
import { actualizarMateria, eliminarMateria, insertarMateria, obtenerMateriaPorId, obtenerMaterias } from '../../../controllers/moduleAlumnos/GestionMaterias/materias.js';

const router = express.Router();

router.get('/', obtenerMaterias);
router.get('/:idMateria', obtenerMateriaPorId);
router.post('/', insertarMateria);
router.put('/:idMateria', actualizarMateria);
router.delete('/:idMateria', eliminarMateria);

export default router;
