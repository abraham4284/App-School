import { pool } from "../../../db.js";

// Obtener todas las fichas médicas
export const getFichasMedicas = async (req, res) => {
  try {
    const fichas = await pool.query("SELECT * FROM fichamedica");
    res.json(fichas[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las fichas médicas" });
  }
};

// Crear una nueva ficha médica
export const createFichaMedica = async (req, res) => {
  try {
    const { img, observaciones, alumnos_idAlumnos, alumnos_idUsuarios } = req.body;
    const query = "INSERT INTO fichamedica (img, observaciones, alumnos_idAlumnos, alumnos_idUsuarios) VALUES (?, ?, ?, ?)";
    const values = [img, observaciones, alumnos_idAlumnos, alumnos_idUsuarios];
    const [result] = await pool.query(query, values);
    const newFicha = { idFichaMedica: result.insertId, img, observaciones, alumnos_idAlumnos, alumnos_idUsuarios };
    res.status(201).json(newFicha);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la ficha médica" });
  }
};

// Actualizar una ficha médica existente
export const updateFichaMedica = async (req, res) => {
  try {
    const { id } = req.params;
    const { img, observaciones, alumnos_idAlumnos, alumnos_idUsuarios } = req.body;
    const query = "UPDATE fichamedica SET img = ?, observaciones = ?, alumnos_idAlumnos = ?, alumnos_idUsuarios = ? WHERE idFichaMedica = ?";
    const values = [img, observaciones, alumnos_idAlumnos, alumnos_idUsuarios, id];
    const [rows] = await pool.query(query, values);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "Ficha médica no encontrada" });
    }
    const [updatedFicha] = await pool.query("SELECT * FROM fichamedica WHERE idFichaMedica = ?", [id]);
    res.json(updatedFicha[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la ficha médica" });
  }
};

// Eliminar una ficha médica
export const deleteFichaMedica = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM fichamedica WHERE idFichaMedica = ?";
    const [rows] = await pool.query(query, [id]);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "Ficha médica no encontrada" });
    }
    res.status(200).json({ message: "Ficha Medica eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la ficha médica" });
  }
};
