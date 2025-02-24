import { pool } from '../../../db.js';

// Obtener todos los cursos
export const obtenerCursos = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL ObtenerCursos()');
    res.json(rows[0]); // Devuelve el primer array de resultados
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un curso por ID
export const obtenerCursoPorId = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL ObtenerCursoPorId(?)', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insertar un curso
export const insertarCurso = async (req, res) => {
  try {
    const { nombre, idNiveles, idOrientaciones, idTurnos } = req.body;
    await pool.query('CALL InsertarCurso(?, ?, ?, ?)', [nombre, idNiveles, idOrientaciones, idTurnos]);
    res.json({ message: 'Curso insertado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un curso
export const actualizarCurso = async (req, res) => {
  try {
    const { nombre, idNiveles, idOrientaciones, idTurnos } = req.body;
    await pool.query('CALL ActualizarCurso(?, ?, ?, ?, ?)', [
      req.params.id, nombre, idNiveles, idOrientaciones, idTurnos
    ]);
    res.json({ message: 'Curso actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un curso
export const eliminarCurso = async (req, res) => {
  try {
    await pool.query('CALL EliminarCurso(?)', [req.params.id]);
    res.json({ message: 'Curso eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
