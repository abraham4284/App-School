import express from "express";
import { createPresencia, deletePresencia, getPresencias, updatePresencia } from "../../../controllers/moduleAlumnos/GestionPresenciaAlumnos/presenciaAlumnos.js";


const router = express.Router();

router.get("/", getPresencias);
router.post("/", createPresencia);
router.put("/:id", updatePresencia);
router.delete("/:id", deletePresencia);

export default router;
