import { Router } from "express";
import {
  createIntereses,
  deleteInteres,
  getIntereses,
  updateIntereses,
} from "../../../controllers/modules_contabilidad/intereses/intereses.controllers.js";

const router = Router();

router.get("/intereses", getIntereses);
router.post("/intereses", createIntereses);
router.put("/intereses/:id", updateIntereses);
router.delete("/intereses/:id", deleteInteres);

export default router;
