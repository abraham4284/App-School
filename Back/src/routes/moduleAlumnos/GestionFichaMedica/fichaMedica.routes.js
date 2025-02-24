import express from 'express';
import { actualizarFichaMedica, eliminarFichaMedica, insertarFichaMedica, obtenerFichaMedicaPorId, obtenerFichasMedicas } from '../../../controllers/moduleAlumnos/GestionFichaMedica/fichaMedica.js';

const router = express.Router();

router.get('/', obtenerFichasMedicas);
router.get('/:idFichaMedica', obtenerFichaMedicaPorId);
router.post('/', insertarFichaMedica);
router.put('/:idFichaMedica', actualizarFichaMedica);
router.delete('/:idFichaMedica', eliminarFichaMedica);

export default router;
