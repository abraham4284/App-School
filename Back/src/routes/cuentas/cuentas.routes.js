import { Router } from "express";
import {
  createCuentas,
  deleteCuentas,
  getCuentas,
  updateCuentas,
} from "../../controllers/cuentas/cuentas.controllers.js";

const router = Router();

router.get("/cuentas", getCuentas);
router.post("/cuentas", createCuentas);
router.put("/cuentas/:id", updateCuentas);
router.delete("/cuentas/:id", deleteCuentas);

export default router;
