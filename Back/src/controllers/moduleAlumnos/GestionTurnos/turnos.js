import { pool } from '../../../db.js';  // Importa la conexión con la base de datos

// Obtener todos los turnos
export const obtenerTurnos = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL ObtenerTurnos()');
    res.json(rows[0]);  // Devuelve el primer array de resultados
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un turno por ID
export const obtenerTurnoPorId = async (req, res) => {
  try {
    const { idTurno } = req.params;
    const [rows] = await pool.query('CALL ObtenerTurnoPorId(?)', [idTurno]);
    res.json(rows[0]);  // Devuelve el primer resultado
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insertar un nuevo turno
export const insertarTurno = async (req, res) => {
  try {
    const { modalidad, entrada, salida } = req.body;
    await pool.query('CALL InsertarTurno(?, ?, ?)', [modalidad, entrada, salida]);
    res.json({ message: 'Turno insertado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un turno existente
export const actualizarTurno = async (req, res) => {
  try {
    const { idTurno } = req.params;
    const { modalidad, entrada, salida } = req.body;
    await pool.query('CALL ActualizarTurno(?, ?, ?, ?)', [idTurno, modalidad, entrada, salida]);
    res.json({ message: 'Turno actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un turno
export const eliminarTurno = async (req, res) => {
  try {
    const { idTurno } = req.params;
    await pool.query('CALL EliminarTurno(?)', [idTurno]);
    res.json({ message: 'Turno eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
