import { pool } from '../../../db.js';  // Import del pool de la base de datos

// Obtener todas las materias
export const obtenerMaterias = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL ObtenerMaterias()');
    res.json(rows[0]); // Devuelve el primer array de resultados
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una materia por ID
export const obtenerMateriaPorId = async (req, res) => {
  try {
    const { idMateria } = req.params;
    const [rows] = await pool.query('CALL ObtenerMateriaPorId(?)', [idMateria]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insertar una nueva materia
export const insertarMateria = async (req, res) => {
  try {
    const { nombre, valorMinimo } = req.body;
    await pool.query('CALL InsertarMateria(?, ?)', [nombre, valorMinimo]);
    res.json({ message: 'Materia insertada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una materia existente
export const actualizarMateria = async (req, res) => {
  try {
    const { idMateria } = req.params;
    const { nombre, valorMinimo } = req.body;
    await pool.query('CALL ActualizarMateria(?, ?, ?)', [idMateria, nombre, valorMinimo]);
    res.json({ message: 'Materia actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una materia
export const eliminarMateria = async (req, res) => {
  try {
    const { idMateria } = req.params;
    await pool.query('CALL EliminarMateria(?)', [idMateria]);
    res.json({ message: 'Materia eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
