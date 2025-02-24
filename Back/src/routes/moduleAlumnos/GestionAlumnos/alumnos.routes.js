import express from 'express';
import { actualizarAlumno, eliminarAlumno, insertarAlumno, obtenerAlumnoPorId, obtenerAlumnos } from '../../../controllers/moduleAlumnos/GestionAlumnos/alumnos.js';


const router = express.Router();

router.get('/', obtenerAlumnos);
router.get('/:id', obtenerAlumnoPorId);
router.post('/', insertarAlumno);
router.put('/:id', actualizarAlumno);
router.delete('/:id', eliminarAlumno);

export default router;
