import { Router } from 'express';
import { cobrarRecargoByCuotas } from '../../../controllers/modules_contabilidad/recargos/recargos.controllers.js';

const router = Router();

router.post("/recargos",cobrarRecargoByCuotas)


export default router;