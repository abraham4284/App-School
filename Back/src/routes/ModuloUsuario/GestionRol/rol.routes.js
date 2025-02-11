// routes/roles.routes.js
import { Router } from 'express';
import { createRol, getRoles, updateRol, deleteRol } from '../../../controllers/ModuloUsuario/GestionRol/crudRol.js';  // Asegúrate de que la ruta a tu controlador esté correcta
import { auditoriaMiddleware } from '../../../middlewares/ModuloUsuario/auditoria.js';

const router = Router();

// Rutas para CRUD de roles
router.get('/',auditoriaMiddleware, getRoles);  // Obtener todos los roles
router.post('/',auditoriaMiddleware, createRol);  // Crear un nuevo rol
router.put('/:id',auditoriaMiddleware, updateRol);  // Actualizar rol
router.delete('/:id',auditoriaMiddleware, deleteRol);  // Eliminar rol

export default router;
