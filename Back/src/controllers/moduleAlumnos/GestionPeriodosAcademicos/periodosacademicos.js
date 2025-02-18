import { pool } from "../../../db.js";

// ✅ Obtener todos los periodos académicos
export const getPeriodosAcademicos = async (req, res) => {
  try {
    const [periodos] = await pool.query("SELECT * FROM periodosacademicos");
    res.json(periodos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los períodos académicos" });
    console.log({ error: error.message });
  }
};

// ✅ Crear un nuevo período académico
export const createPeriodoAcademico = async (req, res) => {
  try {
    const { tipo, numero, anio } = req.body;

    if (!tipo || !numero || !anio) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const query = "INSERT INTO periodosacademicos (tipo, numero, anio) VALUES (?, ?, ?)";
    const values = [tipo, numero, anio];

    const [result] = await pool.query(query, values);
    res.status(201).json({ message: "Período académico creado correctamente", idperiodosAcademicos: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Actualizar un período académico
export const updatePeriodoAcademico = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, numero, anio } = req.body;

    if (!tipo || !numero || !anio) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const query = "UPDATE periodosacademicos SET tipo = ?, numero = ?, anio = ? WHERE idperiodosAcademicos = ?";
    const values = [tipo, numero, anio, id];

    const [rows] = await pool.query(query, values);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró el período académico a actualizar" });
    }

    const [rowsSelect] = await pool.query("SELECT * FROM periodosacademicos WHERE idperiodosAcademicos = ?", [id]);
    res.json(rowsSelect[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el período académico" });
    console.log({ error: error.message });
  }
};

// ✅ Eliminar un período académico
export const deletePeriodoAcademico = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM periodosacademicos WHERE idperiodosAcademicos = ?";
    const [rows] = await pool.query(query, [id]);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró el período académico a eliminar" });
    }

    res.status(200).json({ message: "Período académico eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el período académico" });
    console.log({ error: error.message });
  }
};
