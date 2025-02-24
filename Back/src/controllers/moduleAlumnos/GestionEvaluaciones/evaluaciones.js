import { pool } from '../../../db.js';  // Import del pool de la base de datos

// Obtener todas las evaluaciones
export const obtenerEvaluaciones = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL ObtenerEvaluaciones()');
    res.json(rows[0]); // Devuelve el primer array de resultados
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una evaluación por ID
export const obtenerEvaluacionPorId = async (req, res) => {
  try {
    const { idEvaluaciones } = req.params;
    const [rows] = await pool.query('CALL ObtenerEvaluacionPorId(?)', [idEvaluaciones]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insertar una nueva evaluación
export const insertarEvaluacion = async (req, res) => {
  try {
    const { tipo, titulo, fecha } = req.body;
    await pool.query('CALL InsertarEvaluacion(?, ?, ?)', [tipo, titulo, fecha]);
    res.json({ message: 'Evaluación insertada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una evaluación existente
export const actualizarEvaluacion = async (req, res) => {
  try {
    const { idEvaluaciones } = req.params;
    const { tipo, titulo, fecha } = req.body;
    await pool.query('CALL ActualizarEvaluacion(?, ?, ?, ?)', [idEvaluaciones, tipo, titulo, fecha]);
    res.json({ message: 'Evaluación actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una evaluación
export const eliminarEvaluacion = async (req, res) => {
  try {
    const { idEvaluaciones } = req.params;
    await pool.query('CALL EliminarEvaluacion(?)', [idEvaluaciones]);
    res.json({ message: 'Evaluación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
