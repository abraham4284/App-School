import { pool } from '../../../db.js';

// Obtener todos los registros de cursosmateria
export const obtenerCursosMateria = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL ObtenerCursosMateria()');
    res.json(rows[0]); // Devuelve el primer array de resultados
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un registro de cursosmateria por ID
export const obtenerCursoMateriaPorId = async (req, res) => {
  try {
    const { idCurso, idNiveles, idOrientaciones, idTurnos, idMaterias } = req.params;
    const [rows] = await pool.query('CALL ObtenerCursoMateriaPorId(?, ?, ?, ?, ?)', [
      idCurso, idNiveles, idOrientaciones, idTurnos, idMaterias
    ]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insertar un nuevo registro en cursosmateria
export const insertarCursoMateria = async (req, res) => {
  try {
    const { idCurso, idNiveles, idOrientaciones, idTurnos, idMaterias, idUsuarios, idRol } = req.body;
    await pool.query('CALL InsertarCursoMateria(?, ?, ?, ?, ?, ?, ?)', [
      idCurso, idNiveles, idOrientaciones, idTurnos, idMaterias, idUsuarios, idRol
    ]);
    res.json({ message: 'CursoMateria insertado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un registro de cursosmateria
export const actualizarCursoMateria = async (req, res) => {
  try {
    const { idCurso, idNiveles, idOrientaciones, idTurnos, idMaterias } = req.params;
    const { idUsuarios, idRol } = req.body;
    await pool.query('CALL ActualizarCursoMateria(?, ?, ?, ?, ?, ?, ?)', [
      idCurso, idNiveles, idOrientaciones, idTurnos, idMaterias, idUsuarios, idRol
    ]);
    res.json({ message: 'CursoMateria actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un registro de cursosmateria
export const eliminarCursoMateria = async (req, res) => {
  try {
    const { idCurso, idNiveles, idOrientaciones, idTurnos, idMaterias } = req.params;
    await pool.query('CALL EliminarCursoMateria(?, ?, ?, ?, ?)', [
      idCurso, idNiveles, idOrientaciones, idTurnos, idMaterias
    ]);
    res.json({ message: 'CursoMateria eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
