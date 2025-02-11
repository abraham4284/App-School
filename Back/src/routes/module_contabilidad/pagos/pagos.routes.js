import { Router } from 'express';
import { createPagoByCuota } from '../../../controllers/modules_contabilidad/pagos/pagos.controllers.js';

const router = Router();


router.post("/pagos", createPagoByCuota)



export default router