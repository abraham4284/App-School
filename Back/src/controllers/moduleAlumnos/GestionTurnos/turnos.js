import { pool } from "../../../db.js";

export const getTurnos = async (req, res) => {
  try {
    const turnos = await pool.query("SELECT * FROM turnos");
    res.json(turnos[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los turnos" });
  }
};

export const createTurno = async (req, res) => {
  try {
    const { modalidad, entrada, salida } = req.body;
    const query = "INSERT INTO turnos (modalidad, entrada, salida) VALUES (?, ?, ?)";
    const values = [modalidad, entrada, salida];
    const [result] = await pool.query(query, values);
    const newTurno = { idTurnos: result.insertId, modalidad, entrada, salida };
    res.status(201).json(newTurno);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el turno" });
  }
};

export const updateTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const { modalidad, entrada, salida } = req.body;
    const query = "UPDATE turnos SET modalidad = ?, entrada = ?, salida = ? WHERE idTurnos = ?";
    const values = [modalidad, entrada, salida, id];
    const [rows] = await pool.query(query, values);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "Turno no encontrado" });
    }
    const [updatedTurno] = await pool.query("SELECT * FROM turnos WHERE idTurnos = ?", [id]);
    res.json(updatedTurno[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el turno" });
  }
};

export const deleteTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM turnos WHERE idTurnos = ?";
    const [rows] = await pool.query(query, [id]);
    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "Turno no encontrado" });
    }
    res.status(200).json({ message: "Turno eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el turno" });
  }
};
