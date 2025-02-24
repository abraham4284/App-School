import { pool } from '../../../db.js';  // Importa la conexión con la base de datos

// Obtener todos los registros de asistencia de los alumnos
export const obtenerPresenciaAlumnos = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL ObtenerPresenciaAlumnos()');
    res.json(rows[0]);  // Devuelve el primer array de resultados
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un registro de asistencia de un alumno por ID
export const obtenerPresenciaAlumnoPorId = async (req, res) => {
  try {
    const { idRegistroAsistenciaAlumnos } = req.params;
    const [rows] = await pool.query('CALL ObtenerPresenciaAlumnoPorId(?)', [idRegistroAsistenciaAlumnos]);
    res.json(rows[0]);  // Devuelve el primer resultado
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insertar un nuevo registro de asistencia
export const insertarPresenciaAlumno = async (req, res) => {
  try {
    const { fecha, hora, estado, justificado, idAlumnos, idMotivosAlumnos } = req.body;
    await pool.query('CALL InsertarPresenciaAlumno(?, ?, ?, ?, ?, ?)', [fecha, hora, estado, justificado, idAlumnos, idMotivosAlumnos]);
    res.json({ message: 'Registro de asistencia insertado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un registro de asistencia existente
export const actualizarPresenciaAlumno = async (req, res) => {
  try {
    const { idRegistroAsistenciaAlumnos } = req.params;
    const { fecha, hora, estado, justificado, idAlumnos, idMotivosAlumnos } = req.body;
    await pool.query('CALL ActualizarPresenciaAlumno(?, ?, ?, ?, ?, ?, ?)', [idRegistroAsistenciaAlumnos, fecha, hora, estado, justificado, idAlumnos, idMotivosAlumnos]);
    res.json({ message: 'Registro de asistencia actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un registro de asistencia
export const eliminarPresenciaAlumno = async (req, res) => {
  try {
    const { idRegistroAsistenciaAlumnos } = req.params;
    await pool.query('CALL EliminarPresenciaAlumno(?)', [idRegistroAsistenciaAlumnos]);
    res.json({ message: 'Registro de asistencia eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
