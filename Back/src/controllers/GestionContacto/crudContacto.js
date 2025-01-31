import { pool } from "../../db.js";

export const getContactos = async (req, res) => {
  try {
    const contactos = await pool.query("SELECT * FROM contacto");
    res.json(contactos[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los contactos" });
    console.log({ error: error.message });
  }
};

export const createContacto = async (req, res) => {
  try {
    const { nombre, celular, email, idUsuarios } = req.body;

    if (!nombre || !celular || !email || !idUsuarios) {
      return res.status(400).json({ error: "Todos los campos obligatorios deben ser completados." });
    }

    const query = `
      INSERT INTO contacto (nombre, celular, email, idUsuarios) 
      VALUES (?, ?, ?, ?)
    `;

    const values = [nombre, celular, email, idUsuarios];

    const [result] = await pool.query(query, values);

    const newContacto = {
      idContacto: result.insertId,
      nombre,
      celular,
      email,
      idUsuarios,
    };

    res.status(201).json(newContacto);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el contacto" });
    console.log({ error: error.message });
  }
};

export const updateContacto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, celular, email, idUsuarios } = req.body;

    const [contactoExists] = await pool.query("SELECT * FROM contacto WHERE idContacto = ?", [id]);

    if (contactoExists.length === 0) {
      return res.status(404).json({ error: "Contacto no encontrado" });
    }

    const query = `
      UPDATE contacto 
      SET nombre = ?, celular = ?, email = ?, idUsuarios = ?
      WHERE idContacto = ?
    `;

    const values = [nombre, celular, email, idUsuarios, id];

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No se pudo actualizar el contacto" });
    }

    const [updatedContacto] = await pool.query("SELECT * FROM contacto WHERE idContacto = ?", [id]);

    res.json(updatedContacto[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el contacto" });
    console.log({ error: error.message });
  }
};

export const deleteContacto = async (req, res) => {
  try {
    const { id } = req.params;

    const [contactoExists] = await pool.query("SELECT * FROM contacto WHERE idContacto = ?", [id]);

    if (contactoExists.length === 0) {
      return res.status(404).json({ error: "Contacto no encontrado" });
    }

    const [result] = await pool.query("DELETE FROM contacto WHERE idContacto = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "No se pudo eliminar el contacto" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el contacto" });
    console.log({ error: error.message });
  }
};
