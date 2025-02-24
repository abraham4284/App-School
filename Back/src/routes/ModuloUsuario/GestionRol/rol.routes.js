// routes/roles.routes.js
import { Router } from 'express';
import { createRol, getRoles, updateRol, deleteRol } from '../../../controllers/ModuloUsuario/GestionRol/crudRol.js';  // Asegúrate de que la ruta a tu controlador esté correcta
import { validarToken } from '../../../middlewares/ModuloUsuario/validarToken.js';
import { auditoriaMiddleware } from '../../../middlewares/ModuloUsuario/auditoria.js';
const router = Router();

// Rutas para CRUD de roles
router.get('/', validarToken([2]), auditoriaMiddleware, getRoles);  // Obtener todos los roles
router.post('/',validarToken([2]), auditoriaMiddleware, createRol);  // Crear un nuevo rol
router.put('/:id',validarToken([2]), auditoriaMiddleware, updateRol);  // Actualizar rol
router.delete('/:id', validarToken([2]), auditoriaMiddleware,deleteRol);  // Eliminar rol

export default router;
