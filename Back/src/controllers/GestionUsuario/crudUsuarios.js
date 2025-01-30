import { pool } from "../../db.js";

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await pool.query("SELECT * FROM usuarios");
    res.json(usuarios[0]);  // Responder con la lista de usuarios
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
    console.log({ error: error.message });
  }
};



export const createUsuario = async (req, res) => {
  try {
    const { 
      apellido, nombre, telefono, username, password, email, DNI, fechaNac, 
      antiguedad, genero, estado, legajo, idRol 
    } = req.body;

    // Validación de campos obligatorios
    if (!apellido || !nombre || !username || !password || !email || !DNI || !fechaNac || !idRol) {
      return res.status(400).json({ error: "Todos los campos obligatorios deben ser completados." });
    }

    const query = `
      INSERT INTO usuarios (apellido, nombre, telefono, username, password, email, DNI, fechaNac, antiguedad, genero, estado, legajo, idRol) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [apellido, nombre, telefono, username, password, email, DNI, fechaNac, antiguedad, genero, estado, legajo, idRol];

    const [result] = await pool.query(query, values);

    const newUser = {
      idUsuarios: result.insertId,
      apellido, nombre, telefono, username, email, DNI, fechaNac, antiguedad, genero, estado, legajo, idRol
    };

    res.status(201).json(newUser);

  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
    console.log({ error: error.message });
  }
};

  
export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      apellido, nombre, telefono, username, password, email, DNI, fechaNac, 
      antiguedad, genero, estado, legajo, idRol 
    } = req.body;

    // Verificar si el usuario existe
    const [userExists] = await pool.query("SELECT * FROM usuarios WHERE idUsuarios = ?", [id]);

    if (userExists.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const query = `
      UPDATE usuarios 
      SET apellido = ?, nombre = ?, telefono = ?, username = ?, password = ?, email = ?, DNI = ?, 
          fechaNac = ?, antiguedad = ?, genero = ?, estado = ?, legajo = ?, idRol = ? 
      WHERE idUsuarios = ?
    `;

    const values = [
      apellido, nombre, telefono, username, password, email, DNI, fechaNac, 
      antiguedad, genero, estado, legajo, idRol, id
    ];

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No se pudo actualizar el usuario" });
    }

    // Obtener el usuario actualizado
    const [updatedUser] = await pool.query("SELECT * FROM usuarios WHERE idUsuarios = ?", [id]);

    res.json(updatedUser[0]);

  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
    console.log({ error: error.message });
  }
};
  
export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el usuario existe
    const [userExists] = await pool.query("SELECT * FROM usuarios WHERE idUsuarios = ?", [id]);

    if (userExists.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Eliminar usuario
    const [result] = await pool.query("DELETE FROM usuarios WHERE idUsuarios = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No se pudo eliminar el usuario" });
    }

    res.status(204).send();  // Responde con código 204 (No Content) si se eliminó correctamente

  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
    console.log({ error: error.message });
  }
};
  