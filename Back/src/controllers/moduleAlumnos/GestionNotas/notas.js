import { pool } from '../../../db.js';  // Import del pool de la base de datos

// Obtener todas las notas
export const obtenerNotas = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL ObtenerNotas()');
    res.json(rows[0]); // Devuelve el primer array de resultados
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una nota por ID
export const obtenerNotaPorId = async (req, res) => {
  try {
    const { idNota } = req.params;
    const [rows] = await pool.query('CALL ObtenerNotaPorId(?)', [idNota]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insertar una nueva nota
export const insertarNota = async (req, res) => {
  try {
    const { calificacion, fecha, hora, idperiodosAcademicos, idMaterias, idUsuarios, idAlumnos, idCurso, idevaluciones } = req.body;
    await pool.query('CALL InsertarNota(?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [calificacion, fecha, hora, idperiodosAcademicos, idMaterias, idUsuarios, idAlumnos, idCurso, idevaluciones]);
    res.json({ message: 'Nota insertada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una nota existente
export const actualizarNota = async (req, res) => {
  try {
    const { idNota } = req.params;
    const { calificacion, fecha, hora, idperiodosAcademicos, idMaterias, idUsuarios, idAlumnos, idCurso, idevaluciones } = req.body;
    await pool.query('CALL ActualizarNota(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [idNota, calificacion, fecha, hora, idperiodosAcademicos, idMaterias, idUsuarios, idAlumnos, idCurso, idevaluciones]);
    res.json({ message: 'Nota actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una nota
export const eliminarNota = async (req, res) => {
  try {
    const { idNota } = req.params;
    await pool.query('CALL EliminarNota(?)', [idNota]);
    res.json({ message: 'Nota eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
