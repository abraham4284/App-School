import { pool } from "../../../db.js";

export const getPresencias = async (req, res) => {
  try {
    const [presencias] = await pool.query("SELECT * FROM presencia");
    res.json(presencias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las asistencias de alumnos" });
  }
};

export const createPresencia = async (req, res) => {
  try {
    const { fecha, hora, estado, justificado, idAlumnos, idMotivosAlumnos } = req.body;
    const [result] = await pool.query(
      "INSERT INTO presencia (fecha, hora, estado, justificado, idAlumnos, idMotivosAlumnos) VALUES (?, ?, ?, ?, ?, ?)",
      [fecha, hora, estado, justificado, idAlumnos, idMotivosAlumnos]
    );
    res.status(201).json({ message: "Asistencia registrada", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePresencia = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, hora, estado, justificado, idAlumnos, idMotivosAlumnos } = req.body;
    const [rows] = await pool.query(
      "UPDATE presencia SET fecha = ?, hora = ?, estado = ?, justificado = ?, idAlumnos = ?, idMotivosAlumnos = ? WHERE idregistroAsistenciaAlumnos = ?",
      [fecha, hora, estado, justificado, idAlumnos, idMotivosAlumnos, id]
    );
    if (rows.affectedRows === 0) return res.status(404).json({ error: "Registro no encontrado" });

    res.json({ message: "Asistencia actualizada" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la asistencia" });
  }
};

export const deletePresencia = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM presencia WHERE idregistroAsistenciaAlumnos = ?", [id]);
    if (rows.affectedRows === 0) return res.status(404).json({ error: "Registro no encontrado" });

    res.json({ message: "Asistencia eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la asistencia" });
  }
};
