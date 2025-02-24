import { pool } from '../../../db.js';  // Import del pool de la base de datos

// Obtener todas las fichas médicas
export const obtenerFichasMedicas = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL ObtenerFichasMedicas()');
    res.json(rows[0]); // Devuelve el primer array de resultados
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una ficha médica por ID
export const obtenerFichaMedicaPorId = async (req, res) => {
  try {
    const { idFichaMedica } = req.params;
    const [rows] = await pool.query('CALL ObtenerFichaMedicaPorId(?)', [idFichaMedica]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insertar una nueva ficha médica
export const insertarFichaMedica = async (req, res) => {
  try {
    const { img, observaciones, alumnos_idAlumnos, alumnos_idUsuarios } = req.body;
    await pool.query('CALL InsertarFichaMedica(?, ?, ?, ?)', [img, observaciones, alumnos_idAlumnos, alumnos_idUsuarios]);
    res.json({ message: 'Ficha médica insertada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una ficha médica existente
export const actualizarFichaMedica = async (req, res) => {
  try {
    const { idFichaMedica } = req.params;
    const { img, observaciones, alumnos_idAlumnos, alumnos_idUsuarios } = req.body;
    await pool.query('CALL ActualizarFichaMedica(?, ?, ?, ?, ?)', [idFichaMedica, img, observaciones, alumnos_idAlumnos, alumnos_idUsuarios]);
    res.json({ message: 'Ficha médica actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una ficha médica
export const eliminarFichaMedica = async (req, res) => {
  try {
    const { idFichaMedica } = req.params;
    await pool.query('CALL EliminarFichaMedica(?)', [idFichaMedica]);
    res.json({ message: 'Ficha médica eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
