import { pool } from "../../db.js";

// Obtener todas las relaciones tutor-alumno
export const getTutoAlumnos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM tutoalumnos");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las relaciones tutor-alumno" });
    }
};

// Crear una nueva relación tutor-alumno
export const createTutoAlumno = async (req, res) => {
    try {
        const { idTutor, idAlumnos, idUsuarios, idCurso } = req.body;
        
        if (!idTutor || !idAlumnos || !idUsuarios || !idCurso) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        await pool.query("INSERT INTO tutoalumnos (idTutor, idAlumnos, idUsuarios, idCurso) VALUES (?, ?, ?, ?)", 
            [idTutor, idAlumnos, idUsuarios, idCurso]
        );

        res.status(201).json({ message: "Relación tutor-alumno creada exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al crear la relación tutor-alumno" });
    }
};

// Eliminar una relación tutor-alumno
export const deleteTutoAlumno = async (req, res) => {
    try {
        const { idTutor, idAlumnos } = req.params;

        await pool.query("DELETE FROM tutoalumnos WHERE idTutor = ? AND idAlumnos = ?", 
            [idTutor, idAlumnos]
        );

        res.json({ message: "Relación tutor-alumno eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la relación tutor-alumno" });
    }
};
