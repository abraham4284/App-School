import { pool } from '../../../db.js';  // Import del pool de la base de datos

// Obtener todos los motivos
export const obtenerMotivosAlumnos = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL ObtenerMotivosAlumnos()');
    res.json(rows[0]); // Devuelve el primer array de resultados
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un motivo por ID
export const obtenerMotivoAlumnoPorId = async (req, res) => {
  try {
    const { idMotivo } = req.params;
    const [rows] = await pool.query('CALL ObtenerMotivoAlumnoPorId(?)', [idMotivo]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insertar un nuevo motivo
export const insertarMotivoAlumno = async (req, res) => {
  try {
    const { tipo } = req.body;
    await pool.query('CALL InsertarMotivoAlumno(?)', [tipo]);
    res.json({ message: 'Motivo insertado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un motivo existente
export const actualizarMotivoAlumno = async (req, res) => {
  try {
    const { idMotivo } = req.params;
    const { tipo } = req.body;
    await pool.query('CALL ActualizarMotivoAlumno(?, ?)', [idMotivo, tipo]);
    res.json({ message: 'Motivo actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un motivo
export const eliminarMotivoAlumno = async (req, res) => {
  try {
    const { idMotivo } = req.params;
    await pool.query('CALL EliminarMotivoAlumno(?)', [idMotivo]);
    res.json({ message: 'Motivo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
