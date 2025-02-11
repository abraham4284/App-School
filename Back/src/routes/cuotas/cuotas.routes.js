import { Router } from 'express';
import { createPlanCuotas } from '../../controllers/Gestioncuotas/cuotas.controllers.js';

const router = Router();


router.post("/cuotas",createPlanCuotas)

export default router;