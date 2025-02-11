import { pool } from "../../../db.js";
// Obtener todas las relaciones curso-materia
export const getCursosMateria = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM cursosmateria");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las relaciones curso-materia" });
    }
};

// Crear una nueva relación curso-materia
export const createCursoMateria = async (req, res) => {
    try {
        const { idCurso, idNiveles, idOrientaciones, idTurnos, idMaterias, idUsuarios, idRol } = req.body;

        if (!idCurso || !idNiveles || !idOrientaciones || !idTurnos || !idMaterias) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        await pool.query("INSERT INTO cursosmateria (idCurso, idNiveles, idOrientaciones, idTurnos, idMaterias, idUsuarios, idRol) VALUES (?, ?, ?, ?, ?, ?, ?)", 
            [idCurso, idNiveles, idOrientaciones, idTurnos, idMaterias, idUsuarios, idRol]
        );

        res.status(201).json({ message: "Relación curso-materia creada exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al crear la relación curso-materia" });
    }
};

// Eliminar una relación curso-materia
export const deleteCursoMateria = async (req, res) => {
    try {
        const { idCurso, idMaterias } = req.params;

        await pool.query("DELETE FROM cursosmateria WHERE idCurso = ? AND idMaterias = ?", 
            [idCurso, idMaterias]
        );

        res.json({ message: "Relación curso-materia eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la relación curso-materia" });
    }
};
