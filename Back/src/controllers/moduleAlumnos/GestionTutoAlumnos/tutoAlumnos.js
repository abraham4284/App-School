import { pool } from '../../../db.js';  // Importa la conexión con la base de datos

// Obtener todos los tutores de alumnos
export const obtenerTutoresAlumnos = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL ObtenerTutoresAlumnos()');
    res.json(rows[0]);  // Devuelve el primer array de resultados
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un tutor de alumno por ID
export const obtenerTutorAlumnoPorId = async (req, res) => {
  try {
    const { idTutor, idAlumno } = req.params;
    const [rows] = await pool.query('CALL ObtenerTutorAlumnoPorId(?, ?)', [idTutor, idAlumno]);
    res.json(rows[0]);  // Devuelve el primer resultado
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insertar un nuevo tutor de alumno
export const insertarTutorAlumno = async (req, res) => {
  try {
    const { idTutor, idAlumnos, idUsuarios, idCurso } = req.body;
    await pool.query('CALL InsertarTutorAlumno(?, ?, ?, ?)', [idTutor, idAlumnos, idUsuarios, idCurso]);
    res.json({ message: 'Tutor de alumno insertado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un tutor de alumno existente
export const actualizarTutorAlumno = async (req, res) => {
  try {
    const { idTutor, idAlumno } = req.params;
    const { idUsuarios, idCurso } = req.body;
    await pool.query('CALL ActualizarTutorAlumno(?, ?, ?, ?)', [idTutor, idAlumno, idUsuarios, idCurso]);
    res.json({ message: 'Tutor de alumno actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un tutor de alumno
export const eliminarTutorAlumno = async (req, res) => {
  try {
    const { idTutor, idAlumno } = req.params;
    await pool.query('CALL EliminarTutorAlumno(?, ?)', [idTutor, idAlumno]);
    res.json({ message: 'Tutor de alumno eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
