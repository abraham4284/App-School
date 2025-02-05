import { pool } from "../../db.js";

export const getOrientaciones = async (req, res) => {
  try {
    const orientaciones = await pool.query("SELECT * FROM orientaciones");
    res.json(orientaciones[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las orientaciones" });
  }
};

export const createOrientacion = async (req, res) => {
  try {
    const { nombre } = req.body;
    const query = "INSERT INTO orientaciones (nombre) VALUES (?)";
    const values = [nombre];
    const [result] = await pool.query(query, values);
    const newOrientacion = { idOrientaciones: result.insertId, nombre };
    res.status(201).json(newOrientacion);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la orientacion" });
  }
};

export const updateOrientacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const query = "UPDATE orientaciones SET nombre = ? WHERE idOrientaciones = ?";
    const values = [nombre, id];
    const [rows] = await pool.query(query, values);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "Orientacion no encontrada" });
    }
    const [updatedOrientacion] = await pool.query("SELECT * FROM orientaciones WHERE idOrientaciones = ?", [id]);
    res.json(updatedOrientacion[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la orientacion" });
  }
};

export const deleteOrientacion = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM orientaciones WHERE idOrientaciones = ?";
    const [rows] = await pool.query(query, [id]);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "Orientacion no encontrada" });
    }
    res.status(200).json({ message: "Orientación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la orientacion" });
  }
};
