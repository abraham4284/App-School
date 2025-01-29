import { pool } from "../../db.js";

export const getRoles = async (req, res) => {
  try {
    const roles = await pool.query("SELECT * FROM rol");
    res.json(roles[0]);  // Usar res.json() para enviar respuesta en formato JSON
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los roles" });
    console.log({ error: error.message });
  }
};

export const createRol = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ error: "El campo 'nombre' es obligatorio" });
    }

    const query = "INSERT INTO rol (nombre) VALUES (?)";
    const values = [nombre];
    const [result] = await pool.query(query, values);
    const newRol = {
      idrol: result.insertId,
      nombre,
    };
    res.status(201).json(newRol);  // Responder con el nuevo rol creado
  } catch (error) {
    res.status(500).json({ error: "Error al crear el rol" });
    console.log({ error: error.message });
  }
};

export const updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: "El campo 'nombre' es obligatorio" });
    }

    const query = "UPDATE rol SET nombre = ? WHERE idrol = ?";
    const values = [nombre, id];
    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró el rol a actualizar" });
    }

    // Consultar el rol actualizado
    const [rowsSelect] = await pool.query("SELECT * FROM rol WHERE idrol = ?", [id]);
    res.json(rowsSelect[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el rol" });
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
    
    res.status(204).send();  // Responder con un código de estado 204 (No Content)
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el rol" });
    console.log({ error: error.message });
  }
};
