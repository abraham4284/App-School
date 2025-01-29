import { pool } from "../../db.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await pool.query("SELECT * FROM rol");
    res.send(roles[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const createRol = async (req, res) => {
  try {
    const { nombre } = req.body;
    const query = "INSERT INTO rol (nombre) VALUES (?)";
    const values = [nombre];
    const [result] = await pool.query(query, values);
    const newRol = {
      idrol: result.insertId,
      nombre,
    };
    res.status(201).json(newRol);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const query = "UPDATE rol SET nombre = ? WHERE idrol = ?";
    const values = [nombre, id];
    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró el rol a actualizar" });
    }

    const [rowsSelect] = await pool.query("SELECT * FROM rol WHERE idrol = ?", [id]);
    res.json(rowsSelect[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const deleteRol = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM rol WHERE idrol = ?";
    const [rows] = await pool.query(query, [id]);
    
    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró el rol a eliminar" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};
