import { Router } from 'express';
import { createPlanCuotas, getPlanCuotasByIdAlumnos } from '../../../controllers/modules_contabilidad/cuotas/cuotas.controllers.js';

const router = Router();

router.get("/cuotas/:id",getPlanCuotasByIdAlumnos);
router.post("/cuotas",createPlanCuotas)

export default router;