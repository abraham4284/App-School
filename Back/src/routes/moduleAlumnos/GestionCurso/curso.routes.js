import express from 'express';
import { actualizarCurso, eliminarCurso, insertarCurso, obtenerCursoPorId, obtenerCursos } from '../../../controllers/moduleAlumnos/GestionCurso/curso.js';


const router = express.Router();

router.get('/', obtenerCursos);
router.get('/:id', obtenerCursoPorId);
router.post('/', insertarCurso);
router.put('/:id', actualizarCurso);
router.delete('/:id', eliminarCurso);

export default router;
