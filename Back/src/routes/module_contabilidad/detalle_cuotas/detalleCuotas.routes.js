import { Router } from "express";
import { getDetalleCuotasByIdCuotas } from "../../../controllers/modules_contabilidad/detalle_cuotas/detalleCuotas.controllers.js";

const router = Router();

router.get("/detalleCuotas/:id", getDetalleCuotasByIdCuotas);

export default router;
