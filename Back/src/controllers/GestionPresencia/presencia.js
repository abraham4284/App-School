import { pool } from "../../db.js";

// Obtener todas las presencias
export const getPresencias = async (req, res) => {
  try {
    const presencias = await pool.query("SELECT * FROM presencia");
    res.json(presencias[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las presencias" });
  }
};

// Crear una nueva presencia
export const createPresencia = async (req, res) => {
  try {
    const { asistencia, inasistencia, alumnos_idAlumnos, alumnos_idUsuarios, alumnos_idCurso } = req.body;
    const query = "INSERT INTO presencia (asistencia, inasistencia, alumnos_idAlumnos, alumnos_idUsuarios, alumnos_idCurso) VALUES (?, ?, ?, ?, ?)";
    const values = [asistencia, inasistencia, alumnos_idAlumnos, alumnos_idUsuarios, alumnos_idCurso];
    const [result] = await pool.query(query, values);
    const newPresencia = { idPresencia: result.insertId, asistencia, inasistencia, alumnos_idAlumnos, alumnos_idUsuarios, alumnos_idCurso };
    res.status(201).json(newPresencia);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la presencia" });
  }
};

// Actualizar una presencia existente
export const updatePresencia = async (req, res) => {
  try {
    const { id } = req.params;
    const { asistencia, inasistencia, alumnos_idAlumnos, alumnos_idUsuarios, alumnos_idCurso } = req.body;
    const query = "UPDATE presencia SET asistencia = ?, inasistencia = ?, alumnos_idAlumnos = ?, alumnos_idUsuarios = ?, alumnos_idCurso = ? WHERE idPresencia = ?";
    const values = [asistencia, inasistencia, alumnos_idAlumnos, alumnos_idUsuarios, alumnos_idCurso, id];
    const [rows] = await pool.query(query, values);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "Presencia no encontrada" });
    }
    const [updatedPresencia] = await pool.query("SELECT * FROM presencia WHERE idPresencia = ?", [id]);
    res.json(updatedPresencia[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la presencia" });
  }
};

// Eliminar una presencia
export const deletePresencia = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM presencia WHERE idPresencia = ?";
    const [rows] = await pool.query(query, [id]);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "Presencia no encontrada" });
    }
    res.status(200).json({ message: "Asistencia eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la presencia" });
  }
};
