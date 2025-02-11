import { pool } from "../../../db.js";

export const getNiveles = async (req, res) => {
  try {
    const niveles = await pool.query("SELECT * FROM niveles");
    res.json(niveles[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los niveles" });
  }
};

export const createNivel = async (req, res) => {
  try {
    const { nombre } = req.body;
    const query = "INSERT INTO niveles (nombre) VALUES (?)";
    const values = [nombre];
    const [result] = await pool.query(query, values);
    const newNivel = { idNiveles: result.insertId, nombre };
    res.status(201).json(newNivel);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el nivel" });
  }
};

export const updateNivel = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const query = "UPDATE niveles SET nombre = ? WHERE idNiveles = ?";
    const values = [nombre, id];
    const [rows] = await pool.query(query, values);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "Nivel no encontrado" });
    }
    const [updatedNivel] = await pool.query("SELECT * FROM niveles WHERE idNiveles = ?", [id]);
    res.json(updatedNivel[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el nivel" });
  }
};

export const deleteNivel = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM niveles WHERE idNiveles = ?";
    const [rows] = await pool.query(query, [id]);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "Nivel no encontrado" });
    }
    res.status(200).json({ message: "Nivel eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el nivel" });
  }
};
