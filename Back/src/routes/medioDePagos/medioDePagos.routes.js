import { Router } from "express";
import {
  createMedioPago,
  deleteMedioDePago,
  getMedioPagos,
  updateMedioPagos,
} from "../../controllers/medioPagos/medioPagos.controllers.js";

const router = Router();

router.get("/medioDePago", getMedioPagos);
router.post("/medioDePago", createMedioPago);
router.put("/medioDePago/:id", updateMedioPagos);
router.delete("/medioDePago/:id", deleteMedioDePago);

export default router;
