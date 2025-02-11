import { Router } from 'express';
import { getReporteDetalleCuotasByIdCuotas } from '../../../controllers/modules_contabilidad/reportes.cuotas/reportes.cuotas.controllers.js';

const router = Router();

router.get("/reportes/:id", getReporteDetalleCuotasByIdCuotas)


export default router;