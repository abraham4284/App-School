import { Router } from "express";
import { createTurno, deleteTurno, getTurnos, updateTurno } from "../../../controllers/GestionTurnos/turnos.js";


const router = Router();

router.get("/", getTurnos);
router.post("/", createTurno);
router.put("/:id", updateTurno);
router.delete("/:id", deleteTurno);

export default router;
