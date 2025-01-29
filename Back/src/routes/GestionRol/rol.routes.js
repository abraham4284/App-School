// routes/roles.routes.js
import { Router } from 'express';
import { createRol, getRoles, updateRol, deleteRol } from '../../controllers/GestionRol/crudRol.js';  // Asegúrate de que la ruta a tu controlador esté correcta

const router = Router();

// Rutas para CRUD de roles
router.get('/roles', getRoles);  // Obtener todos los roles
router.post('/roles', createRol);  // Crear un nuevo rol
router.put('/roles/:id', updateRol);  // Actualizar rol
router.delete('/roles/:id', deleteRol);  // Eliminar rol

export default router;
