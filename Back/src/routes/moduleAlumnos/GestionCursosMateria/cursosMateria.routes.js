import express from 'express';
import { actualizarCursoMateria, eliminarCursoMateria, insertarCursoMateria, obtenerCursoMateriaPorId, obtenerCursosMateria } from '../../../controllers/moduleAlumnos/GestionCursosMateria/cursosMateria.js';


const router = express.Router();

router.get('/', obtenerCursosMateria);
router.get('/:idCurso/:idNiveles/:idOrientaciones/:idTurnos/:idMaterias', obtenerCursoMateriaPorId);
router.post('/', insertarCursoMateria);
router.put('/:idCurso/:idNiveles/:idOrientaciones/:idTurnos/:idMaterias', actualizarCursoMateria);
router.delete('/:idCurso/:idNiveles/:idOrientaciones/:idTurnos/:idMaterias', eliminarCursoMateria);

export default router;
