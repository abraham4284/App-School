import { pool } from "../../../db.js";
import { auditoriaMiddleware } from "../../../middlewares/ModuloUsuario/auditoria.js";

export const getRoles =  async (req, res) => {
  try {
    const roles = await pool.query("CALL ObtenerRoles()");
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

    // Ejecutar el procedimiento almacenado
    await pool.query("CALL CrearRol(?)", [nombre]);

    // Obtener el ID generado
    const [rows] = await pool.query("SELECT LAST_INSERT_ID() AS idRol");

    const newRol = {
      idrol: rows[0].idRol, // Usamos el ID recuperado
      nombre,
    };

    res.status(201).json(newRol);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el rol" });
    console.log({ error: error.message });
  }
};

export const updateRol = async (req, res) => {
  try {
    const idRol = parseInt(req.params.id, 10); // Convertir id a número
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: "El campo 'nombre' es obligatorio" });
    }

    const query = "CALL ActualizarRol(?, ?)";
    const values = [idRol, nombre];
    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ error: "No se encontró el rol a actualizar" });
    }

    // Consultar el rol actualizado
    const [rowsSelect] = await pool.query("CALL ObtenerRolPorID(?)", [idRol]);
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
