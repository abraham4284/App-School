import { pool } from '../../../db.js';  // Importa el pool de la base de datos

// Obtener todos los periodos académicos
export const obtenerPeriodosAcademicos = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL ObtenerPeriodosAcademicos()');
    res.json(rows[0]);  // Devuelve el primer array de resultados
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un periodo académico por ID
export const obtenerPeriodoAcademicoPorId = async (req, res) => {
  try {
    const { idPeriodoAcademico } = req.params;
    const [rows] = await pool.query('CALL ObtenerPeriodoAcademicoPorId(?)', [idPeriodoAcademico]);
    res.json(rows[0]);  // Devuelve los resultados de la consulta
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insertar un nuevo periodo académico
export const insertarPeriodoAcademico = async (req, res) => {
  try {
    const { tipo, numero, anio } = req.body;
    await pool.query('CALL InsertarPeriodoAcademico(?, ?, ?)', [tipo, numero, anio]);
    res.json({ message: 'Periodo académico insertado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un periodo académico existente
export const actualizarPeriodoAcademico = async (req, res) => {
  try {
    const { idPeriodoAcademico } = req.params;
    const { tipo, numero, anio } = req.body;
    await pool.query('CALL ActualizarPeriodoAcademico(?, ?, ?, ?)', [idPeriodoAcademico, tipo, numero, anio]);
    res.json({ message: 'Periodo académico actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un periodo académico
export const eliminarPeriodoAcademico = async (req, res) => {
  try {
    const { idPeriodoAcademico } = req.params;
    await pool.query('CALL EliminarPeriodoAcademico(?)', [idPeriodoAcademico]);
    res.json({ message: 'Periodo académico eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
