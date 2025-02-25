import { pool } from '../../../db.js';

// Obtener todas las asistencias
export const obtenerAsistencias = async (req, res) => {
  try {
    const [result] = await pool.query('CALL ObtenerPresenciaMaterias()');
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener asistencia por ID
export const obtenerAsistenciaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('CALL ObtenerPresenciaMateriaPorId(?)', [id]);
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insertar nueva asistencia
export const insertarAsistencia = async (req, res) => {
  const { fecha, hora, estado, justificado, idAlumnos, idMaterias, idMotivosAlumnos } = req.body;
  try {
    await pool.query('CALL InsertarPresenciaMateria(?, ?, ?, ?, ?, ?, ?)', 
      [fecha, hora, estado, justificado, idAlumnos, idMaterias, idMotivosAlumnos]);
    res.status(201).json({ message: 'Asistencia registrada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar asistencia
export const actualizarAsistencia = async (req, res) => {
  const { id } = req.params;
  const { fecha, hora, estado, justificado, idAlumnos, idMaterias, idMotivosAlumnos } = req.body;
  try {
    await pool.query('CALL ActualizarPresenciaMateria(?, ?, ?, ?, ?, ?, ?, ?)', 
      [id, fecha, hora, estado, justificado, idAlumnos, idMaterias, idMotivosAlumnos]);
    res.json({ message: 'Asistencia actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar asistencia
export const eliminarAsistencia = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('CALL EliminarPresenciaMateria(?)', [id]);
    res.json({ message: 'Asistencia eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
