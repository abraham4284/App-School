// routes/roles.routes.js
import { Router } from 'express';
import { createUsuario, getUsuarios, updateUsuario, deleteUsuario } from '../../controllers/GestionUsuario/crudUsuarios.js';  // Asegúrate de que la ruta a tu controlador esté correcta

const router = Router();

// Rutas para CRUD de roles
router.get('/', getUsuarios);  // Obtener todos los roles
router.post('/', createUsuario);  // Crear un nuevo rol
router.put('/:id', updateUsuario);  // Actualizar rol
router.delete('/:id', deleteUsuario);  // Eliminar rol

export default router;
