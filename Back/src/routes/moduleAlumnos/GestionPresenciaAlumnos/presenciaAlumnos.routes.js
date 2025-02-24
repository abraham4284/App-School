import express from "express";
import { createPresencia, deletePresencia, getPresencias, updatePresencia } from "../../../controllers/moduleAlumnos/GestionPresenciaAlumnos/presenciaAlumnos.js";


const router = express.Router();

router.get("/presencia", getPresencias);
router.post("/presencia", createPresencia);
router.put("/presencia/:id", updatePresencia);
router.delete("/presencia/:id", deletePresencia);

export default router;
