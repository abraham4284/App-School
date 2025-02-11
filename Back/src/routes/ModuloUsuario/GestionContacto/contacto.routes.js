import { Router } from 'express';
import { createContacto , getContactos, deleteContacto, updateContacto} from '../../../controllers/ModuloUsuario/GestionContacto/crudContacto.js';  // Asegúrate de que la ruta a tu controlador esté correcta

const router = Router();

// Rutas para CRUD
router.get('/', getContactos );  
router.post('/', createContacto);  
router.put('/:id', updateContacto);  
router.delete('/:id', deleteContacto);  
export default router;
