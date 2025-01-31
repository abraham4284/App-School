
import { Router } from 'express';
import { createDireccion, getDirecciones, updateDireccion, deleteDireccion} from '../../controllers/GestionDirecciones/crudDirecciones.js';  // Asegúrate de que la ruta a tu controlador esté correcta

const router = Router();

// Rutas para CRUD
router.get('/', getDirecciones);  
router.post('/', createDireccion);  
router.put('/:id', updateDireccion);  
router.delete('/:id', deleteDireccion);  
export default router;
