// routes/motivosUsuarios.routes.js
import { Router } from 'express';
import { createMotivo, getMotivos, updateMotivo, deleteMotivo } from '../../../controllers/ModuloUsuario/GestionMotivos/crudMotivos.js';
import { validarToken } from '../../../middlewares/ModuloUsuario/validarToken.js';
import { auditoriaMiddleware } from '../../../middlewares/ModuloUsuario/auditoria.js';

const router = Router();

// Rutas para CRUD de motivos de usuario
router.get('/', validarToken([2]), auditoriaMiddleware, getMotivos);  // Obtener todos los motivos
router.post('/', validarToken([2]), auditoriaMiddleware, createMotivo);  // Crear un nuevo motivo
router.put('/:id', validarToken([2]), auditoriaMiddleware, updateMotivo);  // Actualizar motivo
router.delete('/:id', validarToken([2]), auditoriaMiddleware, deleteMotivo);  // Eliminar motivo

export default router;
