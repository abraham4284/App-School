import { pool } from '../../../db.js';  // Importa la conexión con la base de datos

// Obtener todos los tutores
export const obtenerTutores = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL ObtenerTutores()');
    res.json(rows[0]);  // Devuelve el primer array de resultados
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un tutor por ID
export const obtenerTutorPorId = async (req, res) => {
  try {
    const { idTutor } = req.params;
    const [rows] = await pool.query('CALL ObtenerTutorPorId(?)', [idTutor]);
    res.json(rows[0]);  // Devuelve el primer resultado
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insertar un nuevo tutor
export const insertarTutor = async (req, res) => {
  try {
    const { nombre, apellido, DNI, fechaNac, observaciones, genero } = req.body;
    await pool.query('CALL InsertarTutor(?, ?, ?, ?, ?, ?)', [nombre, apellido, DNI, fechaNac, observaciones, genero]);
    res.json({ message: 'Tutor insertado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un tutor existente
export const actualizarTutor = async (req, res) => {
  try {
    const { idTutor } = req.params;
    const { nombre, apellido, DNI, fechaNac, observaciones, genero } = req.body;
    await pool.query('CALL ActualizarTutor(?, ?, ?, ?, ?, ?, ?)', [idTutor, nombre, apellido, DNI, fechaNac, observaciones, genero]);
    res.json({ message: 'Tutor actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un tutor
export const eliminarTutor = async (req, res) => {
  try {
    const { idTutor } = req.params;
    await pool.query('CALL EliminarTutor(?)', [idTutor]);
    res.json({ message: 'Tutor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
