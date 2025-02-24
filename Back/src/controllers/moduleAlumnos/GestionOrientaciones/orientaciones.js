import { pool } from '../../../db.js';  // Import del pool de la base de datos

// Obtener todas las orientaciones
export const obtenerOrientaciones = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL ObtenerOrientaciones()');
    res.json(rows[0]); // Devuelve el primer array de resultados
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una orientacion por ID
export const obtenerOrientacionPorId = async (req, res) => {
  try {
    const { idOrientacion } = req.params;
    const [rows] = await pool.query('CALL ObtenerOrientacionPorId(?)', [idOrientacion]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insertar una nueva orientacion
export const insertarOrientacion = async (req, res) => {
  try {
    const { nombre } = req.body;
    await pool.query('CALL InsertarOrientacion(?)', [nombre]);
    res.json({ message: 'Orientación insertada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una orientacion existente
export const actualizarOrientacion = async (req, res) => {
  try {
    const { idOrientacion } = req.params;
    const { nombre } = req.body;
    await pool.query('CALL ActualizarOrientacion(?, ?)', [idOrientacion, nombre]);
    res.json({ message: 'Orientación actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una orientacion
export const eliminarOrientacion = async (req, res) => {
  try {
    const { idOrientacion } = req.params;
    await pool.query('CALL EliminarOrientacion(?)', [idOrientacion]);
    res.json({ message: 'Orientación eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
