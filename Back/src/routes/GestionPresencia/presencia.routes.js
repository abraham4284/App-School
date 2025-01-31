import { Router } from "express";
import { createPresencia, deletePresencia, getPresencias, updatePresencia } from "../../controllers/GestionPresencia/presencia.js";


const router = Router();

router.get("/", getPresencias);
router.post("/", createPresencia);
router.put("/:id", updatePresencia);
router.delete("/:id", deletePresencia);

export default router;
