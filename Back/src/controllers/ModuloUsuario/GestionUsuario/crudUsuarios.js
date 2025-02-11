import { pool } from "../../../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../../../config.js";
import { createAccesToken } from "../../../libs/createAccessToken.js";

export const getUsuarios = async (req, res) => {
  try {
    const [usuarios] = await pool.query("SELECT * FROM usuarios");
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
    console.log({ error: error.message });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const { apellido, nombre, telefono, username, password, email, DNI, fechaNac, antiguedad, genero, estado, legajo, idRol } = req.body;

    if (!apellido || !nombre || !username || !password || !email || !DNI || !fechaNac || !idRol) {
      return res.status(400).json({ error: "Todos los campos obligatorios deben ser completados." });
    }

    const [existingUser] = await pool.query("SELECT * FROM usuarios WHERE username = ?", [username]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO usuarios (apellido, nombre, telefono, username, password, email, DNI, fechaNac, antiguedad, genero, estado, legajo, idRol) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [apellido, nombre, telefono, username, hashedPassword, email, DNI, fechaNac, antiguedad, genero, estado, legajo, idRol];
    const [result] = await pool.query(query, values);

    const newUser = { idUsuarios: result.insertId, apellido, nombre, telefono, username, email, DNI, fechaNac, antiguedad, genero, estado, legajo, idRol };
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
    console.log({ error: error.message });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Buscar el usuario en la base de datos
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE username = ?", [username]);
    
    if (rows.length === 0) {
      return res.status(400).json({ error: "Usuario o contraseña incorrectos" });
    }

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    // Datos del usuario
    const datosUsuario = { idUsuarios: rows[0].idUsuarios, username, rol: rows[0].idRol };
    const token = createAccesToken(datosUsuario);

    // Registrar login en la tabla "login"
    const fecha = new Date().toISOString().split("T")[0]; // Obtiene la fecha en formato YYYY-MM-DD
    const hora = new Date().toTimeString().split(" ")[0]; // Obtiene la hora en formato HH:MM:SS
    
    await pool.query(
      "INSERT INTO login (token, fecha, hora, idUsuarios) VALUES (?, ?, ?, ?)",
      [token, fecha, hora, rows[0].idUsuarios]
    );

    // Configurar la cookie del token
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "None", maxAge: 1000 * 60 * 60 });

    res.status(200).json(datosUsuario);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.error("Error en el login:", error.message);
  }
};

export const verifyToken = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "No autorizado" });
    
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.status(401).json({ message: "No autorizado" });
      
      const [userFound] = await pool.query("SELECT * FROM usuarios WHERE username = ?", [user.username]);
      if (userFound.length === 0) return res.status(401).json({ message: "No autorizado" });
      
      res.json({ idUsuarios: user.idUsuarios, username: user.username, rol: user.rol });
    });
  } catch (error) {
    console.log({ error: error.message });
  }
};

export const logoutUsuario = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });
    res.status(200).json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
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
  