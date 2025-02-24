import { pool } from "../../../db.js";

// Obtener todos los motivos de alumnos
export const getMotivosAlumnos = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM motivosalumnos");
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los motivos de alumnos" });
  }
};

// Crear nuevo motivo de alumno
export const createMotivoAlumno = async (req, res) => {
  try {
    const { tipo } = req.body;
    const [result] = await pool.query("INSERT INTO motivosalumnos (tipo) VALUES (?)", [tipo]);
    res.status(201).json({ message: "Motivo de alumno creado correctamente", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el motivo de alumno" });
  }
};

// Actualizar motivo de alumno
export const updateMotivoAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo } = req.body;
    const [result] = await pool.query("UPDATE motivosalumnos SET tipo = ? WHERE idMotivosAlumnos = ?", [tipo, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Motivo no encontrado" });
    }
    res.json({ message: "Motivo de alumno actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el motivo de alumno" });
  }
};

// Eliminar motivo de alumno
export const deleteMotivoAlumno = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM motivosalumnos WHERE idMotivosAlumnos = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Motivo no encontrado" });
    }
    res.json({ message: "Motivo de alumno eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el motivo de alumno" });
  }
};
