import { pool } from '../../../db.js';

// Obtener todos los alumnos
export const obtenerAlumnos = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL ObtenerAlumnos()');
    res.json(rows[0]); // MySQL devuelve un array dentro de otro array
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un alumno por ID
export const obtenerAlumnoPorId = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL ObtenerAlumnoPorId(?)', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insertar un alumno
export const insertarAlumno = async (req, res) => {
  try {
    const { apellidos, nombres, DNI, legajo, fechaNac, observaciones, amonestaciones, estado, genero, legHermano, idUsuarios, idCurso } = req.body;
    await pool.query('CALL InsertarAlumno(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [apellidos, nombres, DNI, legajo, fechaNac, observaciones, amonestaciones, estado, genero, legHermano, idUsuarios, idCurso]);
    res.json({ message: 'Alumno insertado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un alumno
export const actualizarAlumno = async (req, res) => {
  try {
    const { apellidos, nombres, DNI, legajo, fechaNac, observaciones, amonestaciones, estado, genero, legHermano, idUsuarios, idCurso } = req.body;
    await pool.query('CALL ActualizarAlumno(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [req.params.id, apellidos, nombres, DNI, legajo, fechaNac, observaciones, amonestaciones, estado, genero, legHermano, idUsuarios, idCurso]);
    res.json({ message: 'Alumno actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un alumno
export const eliminarAlumno = async (req, res) => {
  try {
    await pool.query('CALL EliminarAlumno(?)', [req.params.id]);
    res.json({ message: 'Alumno eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
