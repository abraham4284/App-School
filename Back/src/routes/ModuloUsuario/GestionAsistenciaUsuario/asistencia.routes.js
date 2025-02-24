import { Router } from 'express';
import { createAsistencia, getAsistencias, updateAsistencia, deleteAsistencia } from '../../../controllers/ModuloUsuario/GestionAsistencia/crudAsistencia.js';
import { validarToken } from '../../../middlewares/ModuloUsuario/validarToken.js';
import { auditoriaMiddleware } from '../../../middlewares/ModuloUsuario/auditoria.js';

const router = Router();

// Rutas CRUD para asistencia
router.get('/', validarToken([2]), auditoriaMiddleware, getAsistencias);
router.post('/', validarToken([2]), auditoriaMiddleware, createAsistencia);
router.put('/:id', validarToken([2]), auditoriaMiddleware, updateAsistencia);
router.delete('/:id', validarToken([2]), auditoriaMiddleware, deleteAsistencia);

export default router;
