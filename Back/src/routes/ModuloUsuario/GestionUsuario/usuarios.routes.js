// routes/roles.routes.js
import { Router } from 'express';
import { createUsuario, getUsuarios, updateUsuario, deleteUsuario, loginUsuario, logoutUsuario, verifyToken } from '../../../controllers/ModuloUsuario/GestionUsuario/crudUsuarios.js';  
import { validarToken } from '../../../middlewares/ModuloUsuario/validarToken.js';
import { auditoriaMiddleware } from '../../../middlewares/ModuloUsuario/auditoria.js';
const router = Router();

// Rutas para CRUD 
router.get('/', validarToken([2]), auditoriaMiddleware, getUsuarios);  
router.post('/', createUsuario);  
router.put('/:id', updateUsuario);  
router.delete('/:id', deleteUsuario);  
router.get('/verify',verifyToken);
//logs
router.post('/login',loginUsuario);
router.post('/logout',logoutUsuario);


export default router;
