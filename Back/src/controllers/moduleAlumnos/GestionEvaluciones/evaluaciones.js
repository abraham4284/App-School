import { pool } from "../../../db.js";

// ✅ Obtener todas las evaluaciones
export const getEvaluciones = async (req, res) => {
  try {
    const [evaluciones] = await pool.query("SELECT * FROM evaluciones");
    res.json(evaluciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las evaluaciones" });
    console.log({ error: error.message });
  }
};

// ✅ Crear una nueva evaluación
export const createEvalucion = async (req, res) => {
  try {
    const { tipo, titulo, fecha } = req.body;

    if (!tipo || !titulo || !fecha) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const query = `INSERT INTO evaluciones (tipo, titulo, fecha) 
                   VALUES (?, ?, ?)`;
    const values = [tipo, titulo, fecha];

    const [result] = await pool.query(query, values);
    res.status(201).json({ message: "Evaluación creada correctamente", idevaluciones: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Actualizar una evaluación
export const updateEvalucion = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, titulo, fecha } = req.body;

    if (!tipo || !titulo || !fecha) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const query = `UPDATE evaluciones SET tipo = ?, titulo = ?, fecha = ? WHERE idevaluciones = ?`;
    const values = [tipo, titulo, fecha, id];

    const [rows] = await pool.query(query, values);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró la evaluación a actualizar" });
    }

    const [rowsSelect] = await pool.query("SELECT * FROM evaluciones WHERE idevaluciones = ?", [id]);
    res.json(rowsSelect[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la evaluación" });
    console.log({ error: error.message });
  }
};

// ✅ Eliminar una evaluación
export const deleteEvalucion = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM evaluciones WHERE idevaluciones = ?";
    const [rows] = await pool.query(query, [id]);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró la evaluación a eliminar" });
    }

    res.status(200).json({ message: "Evaluación eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la evaluación" });
    console.log({ error: error.message });
  }
};
