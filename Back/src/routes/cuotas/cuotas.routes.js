import { Router } from 'express';
import { createPlanCuotas } from '../../controllers/cuotas/cuotas.controllers.js';

const router = Router();


router.post("/cuotas",createPlanCuotas)

export default router;