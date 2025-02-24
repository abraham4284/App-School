import { pool } from '../../../db.js';  // Import del pool de la base de datos

// Obtener todos los niveles
export const obtenerNiveles = async (req, res) => {
  try {
    const [rows] = await pool.query('CALL ObtenerNiveles()');
    res.json(rows[0]); // Devuelve el primer array de resultados
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un nivel por ID
export const obtenerNivelPorId = async (req, res) => {
  try {
    const { idNivel } = req.params;
    const [rows] = await pool.query('CALL ObtenerNivelPorId(?)', [idNivel]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Insertar un nuevo nivel
export const insertarNivel = async (req, res) => {
  try {
    const { nombre } = req.body;
    await pool.query('CALL InsertarNivel(?)', [nombre]);
    res.json({ message: 'Nivel insertado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un nivel existente
export const actualizarNivel = async (req, res) => {
  try {
    const { idNivel } = req.params;
    const { nombre } = req.body;
    await pool.query('CALL ActualizarNivel(?, ?)', [idNivel, nombre]);
    res.json({ message: 'Nivel actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un nivel
export const eliminarNivel = async (req, res) => {
  try {
    const { idNivel } = req.params;
    await pool.query('CALL EliminarNivel(?)', [idNivel]);
    res.json({ message: 'Nivel eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
